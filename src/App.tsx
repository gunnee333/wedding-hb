import {
  Header,
  Account,
  Calendar,
  Gallery,
  GuestBook,
  InviteText,
  Location,
  Menu,
  FontSizeToggle
} from './components';
import styles from './layout.module.scss';

export default function App() {
  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>
        <div className={styles.page}>
          <Header />
          <InviteText />
          <Calendar />
          <Gallery />
          <Location />
          <Account />
          <GuestBook />
          <div className={styles.bottom} />
          <FontSizeToggle />
          <Menu />
        </div>
      </div>
    </div>
  );
}
