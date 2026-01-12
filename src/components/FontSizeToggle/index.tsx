import { Svgs } from '../../assets';
import { useFontSize } from '../../context/FontSizeContext';
import styles from './style.module.scss';

export default function Component() {
  const { mode, setSmall, setLarge } = useFontSize();

  function toggle() {
    if (mode === 'large') {
      setSmall();
    } else {
      setLarge();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fontToggle}>
        <Svgs.text />

        <button className={styles.fontBtn} onClick={toggle} type="button">
          {mode === 'small' ? '큰' : '작은'} 글씨
        </button>
      </div>
    </div>
  );
}
