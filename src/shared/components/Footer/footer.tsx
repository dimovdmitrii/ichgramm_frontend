import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("sidebar:openSearch"));
  };
  const openMessages = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("sidebar:openMessages"));
  };
  const openNotifications = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("sidebar:openNotifications"));
  };
  const openCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("sidebar:openCreate"));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <button type="button" className={styles.linkButton} onClick={openSearch}>
          Search
        </button>
        <Link to="/explore" className={styles.link}>
          Explore
        </Link>
        <button type="button" className={styles.linkButton} onClick={openMessages}>
          Messages
        </button>
        <button type="button" className={styles.linkButton} onClick={openNotifications}>
          Notifications
        </button>
        <button type="button" className={styles.linkButton} onClick={openCreate}>
          Create
        </button>
      </div>
      <p className={styles.copyright}>© {currentYear} ICHgram</p>
    </footer>
  );
};

export default Footer;
