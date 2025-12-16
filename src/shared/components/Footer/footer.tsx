import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/search" className={styles.link}>
          Search
        </Link>
        <Link to="/explore" className={styles.link}>
          Explore
        </Link>
        <Link to="/messages" className={styles.link}>
          Messages
        </Link>
        <Link to="/notifications" className={styles.link}>
          Notifications
        </Link>
        <Link to="/create" className={styles.link}>
          Create
        </Link>
      </div>
      <p className={styles.copyright}>© {currentYear} ICHgram</p>
    </footer>
  );
};

export default Footer;
