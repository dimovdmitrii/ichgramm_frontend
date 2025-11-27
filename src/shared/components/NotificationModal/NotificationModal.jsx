import { useEffect } from "react";
import styles from "./NotificationModal.module.css";
import sashaaAvatar from "../../../assets/Images/sashaa.jpg";
import roadThumbnail from "../../../assets/Images/roadSmall.png";

const NotificationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      username: "sashaa",
      action: "liked your",
      object: "photo.",
      time: "2 d",
    },
    {
      id: 2,
      username: "sashaa",
      action: "commented",
      object: "your photo.",
      time: "2 wek",
    },
    {
      id: 3,
      username: "sashaa",
      action: "started",
      object: "following.",
      time: "2 d",
    },
  ];

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2 className={styles.title}>Notifications</h2>
        <h3 className={styles.subtitle}>New</h3>
        <div className={styles.notificationsList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <img
                src={sashaaAvatar}
                alt={notification.username}
                className={styles.avatar}
              />
              <div className={styles.notificationText}>
                <span className={styles.username}>{notification.username}</span>
                <span className={styles.action}> {notification.action} </span>
                <span className={styles.object}>{notification.object} </span>
                <span className={styles.time}>{notification.time}</span>
              </div>
              <img
                src={roadThumbnail}
                alt="Post thumbnail"
                className={styles.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;

