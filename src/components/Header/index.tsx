import { Images, Svgs } from '../../assets';
import { inviteData } from '../../data/data';
import styles from './style.module.scss';

export default function Component() {
  return (
    <div className={styles.container} id={inviteData.elementId.header}>
      <img src={Images.main_img} alt="" />
      <div className={styles.names}>
        <span>{inviteData.wedding.groomEn}</span>
        <span>{inviteData.wedding.brideEn}</span>
      </div>
      <div className={styles.txtContainer}>
        <div className={styles.married}>
          <div>
            <div>We are</div>
            <div>getting married</div>
          </div>
        </div>
        <div className={styles.date}>{inviteData.date.en}</div>
        <div className={styles.desc}>
          <div>We, who have similar smiles, are getting married.</div>
          <div>
            Holding onto each other`s clasped hands lightly we promise to live
            happily ever after.
          </div>
        </div>
      </div>
      <div className={styles.bottomAni}>
        <Svgs.waves />
      </div>
      <div className={styles.effect}>
        <img src={Images.effect} />
      </div>
    </div>
  );
}
