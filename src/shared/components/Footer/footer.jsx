import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/home" className={`${styles.link} ${styles.homeLink}`}>
        Home
      </Link>
      <Link to="/search" className={`${styles.link} ${styles.searchLink}`}>
        Search
      </Link>
      <Link to="/explore" className={`${styles.link} ${styles.exploreLink}`}>
        Explore
      </Link>
      <Link to="/messages" className={`${styles.link} ${styles.messagesLink}`}>
        Messages
      </Link>
      <Link
        to="/notifications"
        className={`${styles.link} ${styles.notificationsLink}`}
      >
        Notifications
      </Link>
      <Link to="/create" className={`${styles.link} ${styles.createLink}`}>
        Create
      </Link>
      <p className={styles.copyright}>© 2025 ICHgram</p>
    </footer>
  );
};

export default Footer;
