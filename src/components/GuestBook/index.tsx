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
import { db } from '../../lib/firebase';
import styles from './style.module.scss';
import { Svgs } from '../../assets';
import { inviteData } from '../../data/data';
import { useFontSize } from '../../context/FontSizeContext';

type CommentDoc = {
  id: string;
  name: string;
  message: string;
  pwHash: string;
  deleted?: boolean;
  createdAt?: any;
};

function formatDate(ts: any) {
  if (!ts?.toDate) return '';

  const d: Date = ts.toDate();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd}`;
}

export default function Component() {
  const { mode } = useFontSize();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  const [items, setItems] = useState<CommentDoc[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  console.log('submitting', submitting);
  console.log('error', error);

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

  async function onSubmit() {
    const n = name.trim();
    const m = message.trim();
    const p = password.trim();

    if (!n) return setError('이름을 입력해 주세요.');
    if (n.length > 20) return setError('이름은 20자 이내로 입력해 주세요.');
    if (!m) return setError('축하 메시지를 입력해 주세요.');
    if (m.length > 300) return setError('댓글은 300자 이내로 입력해 주세요.');
    if (p.length < 4) return setError('비밀번호는 4자 이상으로 입력해 주세요.');
    if (p.length > 30) return setError('비밀번호는 30자 이내로 입력해 주세요.');

    try {
      setError(undefined);
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
  }

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
    <div className={styles.container} id={inviteData.elementId.guestbook}>
      <div className={styles.title}>GUEST BOOK</div>
      <div className={styles.subTitle}>방명록</div>
      <div className={styles.division} />
      <div className={styles.commentsDesc}>
        <p>따뜻한 마음이 담긴 축하의 글을 남겨주시면</p>
        <p>소중한 추억으로 간직하겠습니다.</p>
      </div>
      <div
        className={[
          styles.commentForm,
          mode === 'large' ? styles.large : undefined
        ].join(' ')}
      >
        <div className={styles.line}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.row}>
          <div>
            <span>이름</span>
          </div>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요."
            maxLength={20}
          />
        </div>

        <div className={styles.row}>
          <div>
            <span>내용</span>
          </div>
          <section>
            <textarea
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="축하 메시지를 남겨주세요. (최대 300자)"
              maxLength={300}
            />
          </section>
        </div>

        <div className={styles.row}>
          <div>
            <span>암호</span>
          </div>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="삭제용 암호 (4자 이상)"
            maxLength={30}
          />
        </div>

        {!!error && <div className={styles.errorText}>{error}</div>}

        <button type="button" onClick={onSubmit}>
          {submitting ? '작성 중...' : '글쓰기'}
        </button>
      </div>

      <div className={styles.commentList}>
        {items.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            <div className={styles.commentHead}>
              <div className={styles.commentName}>{c.name}</div>
              <div className={styles.commentDate}>
                {c.createdAt ? formatDate(c.createdAt) : ''}
              </div>
            </div>

            <div className={styles.commentMsg}>
              {c.deleted ? '삭제된 댓글입니다.' : c.message}
            </div>
            {!c.deleted && (
              <div className={styles.delBtn}>
                <button type="button" onClick={() => requestDelete(c)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
