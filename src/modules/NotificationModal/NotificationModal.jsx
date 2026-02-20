import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationModal.module.css";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import profilePost1 from "../../assets/Images/UsersProfile/Profile_Post1.png";
import profilePost4 from "../../assets/Images/UsersProfile/Profile_Post4.png";
import profilePost6 from "../../assets/Images/UsersProfile/Profile_Post6.png";
import MyPostModal from "../MyPostModal/MyPostModal";

const postThumbnails = [profilePost1, profilePost4, profilePost6];
const NOTIFICATION_USERNAME = "sashaa";
const postsForUser = [
  { image: profilePost1 },
  { image: profilePost4 },
  { image: profilePost6 },
];

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию прокрутки
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Восстанавливаем позицию прокрутки
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      // Очистка при размонтировании
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
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

  const handleAvatarClick = () => {
    onClose();
    navigate(`/other-profile/${NOTIFICATION_USERNAME}`);
  };

  const handleThumbnailClick = (index) => (e) => {
    e.stopPropagation();
    setSelectedPostIndex(index);
    setPostModalOpen(true);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2 className={styles.title}>Notifications</h2>
        <h3 className={styles.subtitle}>New</h3>
        <div className={styles.notificationsList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <button
                type="button"
                onClick={handleAvatarClick}
                className={styles.avatarButton}
                aria-label={`Go to ${notification.username} profile`}
              >
                <img
                  src={sashaaAvatar}
                  alt={notification.username}
                  className={styles.avatar}
                />
              </button>
              <div className={styles.notificationText}>
                <span className={styles.username}>{notification.username}</span>
                <span className={styles.action}> {notification.action} </span>
                <br />
                <span className={styles.object}>{notification.object}</span>
                <span className={styles.time}> {notification.time}</span>
              </div>
              <button
                type="button"
                onClick={handleThumbnailClick(notification.id - 1)}
                className={styles.thumbnailButton}
                aria-label="Open post"
              >
                <img
                  src={postThumbnails[notification.id - 1]}
                  alt="Post thumbnail"
                  className={styles.thumbnail}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <MyPostModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        postIndex={selectedPostIndex}
        posts={postsForUser}
        username={NOTIFICATION_USERNAME}
        avatar={sashaaAvatar}
        isOwnPost={false}
      />
    </>
  );
};

export default NotificationModal;
