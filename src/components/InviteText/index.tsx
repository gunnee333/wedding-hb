import { useState } from 'react';
import { inviteData } from '../../data/data';
import styles from './style.module.scss';
import Modal from '../Modal';
import { Svgs } from '../../assets';

const telNumList: { title: string; name: string; tel: string }[] = [
  {
    title: '신랑',
    name: inviteData.wedding.groom,
    tel: inviteData.wedding.groomPhone
  },
  {
    title: '신부',
    name: inviteData.wedding.bride,
    tel: inviteData.wedding.bridePhone
  },
  {
    title: '신랑 아버지',
    name: inviteData.wedding.groomParents[0].name,
    tel: inviteData.wedding.groomParents[0].phone
  },
  {
    title: '신부 아버지',
    name: inviteData.wedding.brideParents[0].name,
    tel: inviteData.wedding.brideParents[0].phone
  },
  {
    title: '신랑 어머니',
    name: inviteData.wedding.groomParents[1].name,
    tel: inviteData.wedding.groomParents[1].phone
  },
  {
    title: '신부 어머니',
    name: inviteData.wedding.brideParents[1].name,
    tel: inviteData.wedding.brideParents[1].phone
  }
];

export default function Component() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className={styles.container} id={inviteData.elementId.inviteText}>
        <div className={styles.title}>INVITE YOU</div>
        <div className={styles.subTitle}>
          <p>저희 두 사람이</p>
          <p>평생을 함께하기 위해</p>
          <p>서로의 반려자가 되려 합니다.</p>
          <p>
            <br />
          </p>
          <p>그 진실한 서약을 하는 자리에</p>
          <p>소중한 분들을 모십니다.</p>
          <p>
            <br />
          </p>
          <p>자리하시어 축복해 주시면</p>
          <p>대단히 감사하겠습니다.</p>
        </div>
        <div className={styles.names}>
          <p>
            <b>
              {inviteData.wedding.groomParents[0].name} ·{' '}
              {inviteData.wedding.groomParents[1].name}
            </b>
            의 장남 <b>{inviteData.wedding.groom.slice(1, 3)}</b>
          </p>
          <p>
            <b>
              {inviteData.wedding.brideParents[0].name} ·{' '}
              {inviteData.wedding.brideParents[1].name}
            </b>
            의 차녀 <b>{inviteData.wedding.bride.slice(1, 3)}</b>
          </p>
        </div>
        <div>
          <button onClick={() => setIsModal(true)}>연락하기</button>
        </div>
      </div>
      <Modal
        visible={isModal}
        isCenter={true}
        contentClassName={styles.modal}
        toWay="none"
        close={() => setIsModal(false)}
      >
        <div className={styles.list}>
          {telNumList.map((item) => (
            <div key={item.title} className={styles.item}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.name}>{item.name}</div>
              <div>
                <a href={`tel:${item.tel}`}>
                  <Svgs.tel />
                </a>
                <a href={`sms:${item.tel}`}>
                  <Svgs.sms />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
