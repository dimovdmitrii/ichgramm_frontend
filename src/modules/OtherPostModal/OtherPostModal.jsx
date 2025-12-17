import { useEffect, useState } from "react";
import styles from "./OtherPostModal.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import whiteHeartIcon from "../../assets/icons/posts_icons/white_heart.svg";
import commentSmileIcon from "../../assets/icons/posts_icons/comment_smile.svg";
import redHeartIcon from "../../assets/icons/posts_icons/Red_Heart.svg";

const OtherPostModal = ({ isOpen, onClose, post, username }) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // TODO: отправка комментария на бэкенд
      setComment("");
    }
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    // TODO: отправка лайка на бэкенд
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.imageSection}>
          <img
            src={post}
            alt="Post"
            className={styles.postImage}
          />
        </div>
        <div className={styles.contentSection}>
          <div className={styles.header}>
            <div className={styles.profileInfo}>
              <div className={styles.avatarWrapper}>
                <img
                  src={ringRainbow}
                  alt="Rainbow ring"
                  className={styles.ringRainbow}
                />
                <img
                  src={profileLogo}
                  alt="Profile"
                  className={styles.avatar}
                />
              </div>
              <span className={styles.username}>{username}</span>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton} onClick={handleLike}>
                <img
                  src={isLiked ? redHeartIcon : whiteHeartIcon}
                  alt="Like"
                  className={`${styles.actionIcon} ${
                    isLiked ? styles.liked : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className={styles.commentForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <button type="button" className={styles.emojiButton}>
                <img
                  src={commentSmileIcon}
                  alt="Emoji"
                  className={styles.emojiIcon}
                />
              </button>
              <input
                type="text"
                className={styles.commentInput}
                placeholder="Add comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherPostModal;



