import { inviteData } from '../../data/data';
import styles from './style.module.scss';

export default function Component() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Location</div>
      <div className={styles.subTitle}>오시는 길</div>
      <div className={styles.division} />
      <div className={styles.desc}>
        {inviteData.place.address}
        <br />
        {inviteData.place.hallname}
        <br />
        {inviteData.place.tel}
      </div>
    </div>
  );
}
