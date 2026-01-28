import { useState } from 'react';
import { Images, Svgs } from '../../assets';
import styles from './style.module.scss';
import Modal from '../Modal';
import { inviteData } from '../../data/data';

const menuList: { id: string; title: string }[] = [
  { id: inviteData.elementId.header, title: '모시는 글' },
  { id: inviteData.elementId.inviteText, title: '연락하기' },
  { id: inviteData.elementId.gallery, title: '갤러리' },
  { id: inviteData.elementId.location, title: '오시는 길' },
  // { id: inviteData.elementId.account, title: '마음 전하실 곳' },
  { id: inviteData.elementId.guestbook, title: '방명록' }
];

async function kakaoShare(text: string) {
  window.navigator.share?.({ url: text });
}
async function copyText(text: string) {
  await window.navigator?.clipboard?.writeText(text);
  alert('링크를 복사했습니다.');
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  function scrollToId(id: string) {
    setIsMenuOpen(false);
    setTimeout(() => {
      let scrollElement = document.getElementById(id);
      scrollElement?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Svgs.menu />
          </div>
          <p />
          <div onClick={() => setIsShareOpen((prev) => !prev)}>
            <Svgs.share />
          </div>
        </div>
      </div>
      <div
        className={[
          styles.menuOpen,
          isMenuOpen ? styles.active : undefined
        ].join(' ')}
      >
        {menuList.map((item) => (
          <div
            key={item.title}
            className={styles.menuItem}
            onClick={() => scrollToId(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <Modal
        visible={isShareOpen}
        isCenter={true}
        contentClassName={styles.shareModal}
        toWay="none"
        close={() => setIsShareOpen(false)}
      >
        <div className={styles.list}>
          <div
            className={styles.item}
            onClick={() => kakaoShare(inviteData.link)}
          >
            <div>
              <Svgs.kakao />
            </div>
            <div>카카오톡</div>
          </div>
          <div
            className={styles.item}
            onClick={() => copyText(inviteData.link)}
          >
            <div>
              <Svgs.copy />
            </div>
            <div>URL 복사</div>
          </div>
          <div className={styles.item} onClick={() => setIsQrOpen(true)}>
            <div>
              <Svgs.qrcode />
            </div>
            <div>QR 코드</div>
          </div>
        </div>
        <div className={styles.btn}>
          <button onClick={() => setIsShareOpen(false)}>닫기</button>
        </div>
      </Modal>
      <Modal
        visible={isQrOpen}
        isCenter={true}
        contentClassName={styles.qrModal}
        toWay="none"
        close={() => setIsQrOpen(false)}
      >
        <div className={styles.container}>
          <img src={Images.inviteQr} />
        </div>
        <div className={styles.btn}>
          <button onClick={() => setIsQrOpen(false)}>닫기</button>
        </div>
      </Modal>
    </>
  );
}
