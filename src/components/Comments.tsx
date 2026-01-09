import { FormEvent, useEffect, useMemo, useState } from 'react';
import bcrypt from 'bcryptjs';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

type CommentDoc = {
  id: string;
  name: string;
  message: string;
  pwHash: string;
  deleted?: boolean;
  createdAt?: any;
};

export function Comments() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  const [items, setItems] = useState<CommentDoc[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colRef = useMemo(() => collection(db, 'comments'), []);

  useEffect(() => {
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const next = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            name: String(data.name ?? ''),
            message: String(data.message ?? ''),
            pwHash: String(data.pwHash ?? ''),
            deleted: Boolean(data.deleted ?? false),
            createdAt: data.createdAt
          };
        });
        setItems(next);
      },
      (e) => setError(e.message)
    );
    return () => unsub();
  }, [colRef]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const n = name.trim();
    const m = message.trim();
    const p = password.trim();

    if (!n) return setError('이름을 입력해 주세요.');
    if (!m) return setError('내용을 입력해 주세요.');
    if (p.length < 4) return setError('비밀번호는 4자 이상으로 입력해 주세요.');
    if (n.length > 20) return setError('이름은 20자 이내로 입력해 주세요.');
    if (m.length > 300) return setError('댓글은 300자 이내로 입력해 주세요.');
    if (p.length > 30) return setError('비밀번호는 30자 이내로 입력해 주세요.');

    try {
      setSubmitting(true);
      const pwHash = await bcrypt.hash(p, 10);

      await addDoc(colRef, {
        name: n,
        message: m,
        pwHash,
        deleted: false,
        createdAt: serverTimestamp()
      });

      setMessage('');
      setPassword('');
    } catch (e: any) {
      setError(e?.message ?? '댓글 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const requestDelete = async (c: CommentDoc) => {
    if (c.deleted) return;

    const input = prompt('댓글 삭제 비밀번호를 입력해 주세요.');
    if (!input) return;

    const ok = await bcrypt.compare(input, c.pwHash);
    if (!ok) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 소프트 삭제: deleted=true, message=""
    await updateDoc(doc(db, 'comments', c.id), {
      deleted: true,
      message: '',
      pwHash: c.pwHash
    });
  };

  return (
    <div>
      <form className="commentForm" onSubmit={onSubmit}>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름(기명)"
          maxLength={20}
        />

        <textarea
          className="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요 (최대 300자)"
          maxLength={300}
        />

        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="삭제용 비밀번호 (4자 이상)"
          maxLength={30}
        />

        {error && <div className="errorText">{error}</div>}

        <button className="btnPrimary" type="submit" disabled={submitting}>
          {submitting ? '등록 중...' : '댓글 등록'}
        </button>
      </form>

      <div className="commentList">
        {items.map((c) => (
          <div key={c.id} className="commentItem">
            <div className="commentHead">
              <div className="commentName">{c.name}</div>
              {!c.deleted && (
                <button
                  className="miniBtn"
                  type="button"
                  onClick={() => requestDelete(c)}
                >
                  삭제
                </button>
              )}
            </div>

            <div className="commentMsg">
              {c.deleted ? '삭제된 댓글입니다.' : c.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
