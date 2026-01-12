import { useState } from 'react';
import { Images, Svgs } from '../../assets';
import { inviteData } from '../../data/data';
import styles from './style.module.scss';

interface IItem {
  title: string;
  name: string;
  bank?: string;
  account?: string;
  kakaoPay?: string;
}
const list1: IItem[] = [
  {
    title: '신랑',
    name: inviteData.wedding.groom,
    bank: inviteData.wedding.groomData.bank,
    account: inviteData.wedding.groomData.account,
    kakaoPay: inviteData.wedding.groomData.kakaoPay
  },
  {
    title: '아버지',
    name: inviteData.wedding.groomParents[0].name,
    bank: inviteData.wedding.groomParents[0].bank,
    account: inviteData.wedding.groomParents[0].account
  },
  {
    title: '어머니',
    name: inviteData.wedding.groomParents[1].name,
    bank: inviteData.wedding.groomParents[1].bank,
    account: inviteData.wedding.groomParents[1].account
  }
];
const list2: IItem[] = [
  {
    title: '신부',
    name: inviteData.wedding.bride,
    bank: inviteData.wedding.brideData.bank,
    account: inviteData.wedding.brideData.account,
    kakaoPay: inviteData.wedding.brideData.kakaoPay
  },
  {
    title: '아버지',
    name: inviteData.wedding.brideParents[0].name,
    bank: inviteData.wedding.brideParents[0].bank,
    account: inviteData.wedding.brideParents[0].account
  },
  {
    title: '어머니',
    name: inviteData.wedding.brideParents[1].name,
    bank: inviteData.wedding.brideParents[1].bank,
    account: inviteData.wedding.brideParents[1].account
  }
];

async function copyText(text: string) {
  await window.navigator?.clipboard?.writeText(text);
  alert('계좌번호를 복사했습니다.');
}

export default function Component() {
  const [isToggleOpen1, setIsToggleOpen1] = useState(false);
  const [isToggleOpen2, setIsToggleOpen2] = useState(false);

  return (
    <>
      <div className={styles.container} id={inviteData.elementId.account}>
        <div className={styles.title}>ACCOUNT</div>
        <div className={styles.subTitle}>마음 전하실 곳</div>
        <div className={styles.division} />
        <div className={styles.desc}>
          참석이 어려워 직접 축하를 전하지 못하는
          <br />
          분들을 위해 계좌번호를 기재하였습니다.
          <br />
          넓은 마음으로 양해 부탁드립니다.
          <br />
          전해주시는 진심은 소중하게 간직하여
          <br />
          좋은 부부의 모습으로 보답하겠습니다.
        </div>
        <div
          className={[
            styles.toggle,
            isToggleOpen1 ? styles.active : undefined
          ].join(' ')}
        >
          <div onClick={() => setIsToggleOpen1((prev) => !prev)}>
            <span></span>
            <span>신랑측</span>
            <Svgs.arrow />
          </div>
          <div className={styles.toggleDiv}>
            {list1
              .filter((item) => !!item.account && !!item.bank)
              .map((item) => (
                <ToggleItem item={item} key={item.title} />
              ))}
          </div>
        </div>
        <div
          className={[
            styles.toggle,
            isToggleOpen2 ? styles.active : undefined
          ].join(' ')}
        >
          <div onClick={() => setIsToggleOpen2((prev) => !prev)}>
            <span></span>
            <span>신부측</span>
            <Svgs.arrow />
          </div>
          <div className={styles.toggleDiv}>
            {list2
              .filter((item) => !!item.account && !!item.bank)
              .map((item) => (
                <ToggleItem item={item} key={item.title} />
              ))}
          </div>
        </div>
      </div>
      <Svgs.division fill="#fbf5f5" />
    </>
  );
}

function ToggleItem({ item }: { item: IItem }) {
  return (
    <div key={item.title} className={styles.toggleItem}>
      <div>
        <div>
          {item.title} <b>{item.name}</b>
        </div>
        <div>
          {item.bank} {item.account}
        </div>
      </div>
      <div>
        {item.kakaoPay ? (
          <button
            type="button"
            className={styles.kakaoBtn}
            onClick={() => window.open(item.kakaoPay)}
          >
            <img src={Images.kakaopay} />
          </button>
        ) : undefined}
        <button
          type="button"
          className={styles.copyBtn}
          onClick={() => copyText(`${item.bank} ${item.account}`)}
        >
          <Svgs.copy /> 복사
        </button>
      </div>
    </div>
  );
}
