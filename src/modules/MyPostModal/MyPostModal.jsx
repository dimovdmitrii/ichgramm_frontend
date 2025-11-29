import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyPostModal.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import whiteHeartIcon from "../../assets/icons/posts_icons/white_heart.svg";
import commentSmileIcon from "../../assets/icons/posts_icons/comment_smile.svg";
import heartSmileIcon from "../../assets/icons/posts_icons/heart_smile.png";
import aplauseSmileIcon from "../../assets/icons/posts_icons/aplause_smile.png";
import redHeartIcon from "../../assets/icons/posts_icons/Red_Heart.svg";
import commentIcon from "../../assets/icons/Button_Commenting.svg";
import optionButtonIcon from "../../assets/icons/posts_icons/option_button.svg";
import coachToniaAvatar from "../../assets/Images/modalProfilePictures/coach.tonia.jpg";
import fsssocietyAvatar from "../../assets/Images/modalProfilePictures/fsssociety.jpg";
import modalImage1 from "../../assets/Images/modalProfilePictures/profile_modal1.jpg";
import modalImage2 from "../../assets/Images/modalProfilePictures/profile_modal2.jpg";
import modalImage3 from "../../assets/Images/modalProfilePictures/profile_modal3.jpg";
import modalImage4 from "../../assets/Images/modalProfilePictures/profile_modal4.jpg";
import modalImage5 from "../../assets/Images/modalProfilePictures/profile_modal5.jpg";
import modalImage6 from "../../assets/Images/modalProfilePictures/profile_modal6.jpg";

const MyPostModal = ({ isOpen, onClose, postIndex }) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const modalImages = [
    modalImage1,
    modalImage2,
    modalImage3,
    modalImage4,
    modalImage5,
    modalImage6,
  ];

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

  if (!isOpen || postIndex === null || postIndex === undefined) return null;

  const currentImage = modalImages[postIndex] || modalImage1;

  const comments = [
    {
      id: 1,
      username: "coach.tonia",
      avatar: coachToniaAvatar,
      text: "спасибо!!!!",
      time: "17 h.",
      likes: 1,
      isLiked: true,
    },
    {
      id: 2,
      username: "fsssociety",
      avatar: fsssocietyAvatar,
      text: "Вау, это очень классно на самом деле!",
      time: "23 h.",
      likes: 3,
      isLiked: false,
    },
  ];

  const postDescription =
    "Потрясающие новости пришли к нам из Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажёров, будет представлен на Web Summit 2024 в Португалии🔥\n\nМы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества крутых специалистов, помогающих развивать и очищать нашу планету.\n\nЗанимайте место на бесплатной консультации по ссылке в шапке профиля, чтобы узнать подробности!";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Здесь будет логика отправки комментария
      setComment("");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.imageSection}>
          <img src={currentImage} alt={`Post ${postIndex + 1}`} className={styles.postImage} />
        </div>
        <div className={styles.contentSection}>
          <div className={styles.header}>
            <div className={styles.profileInfo}>
              <div className={styles.avatarWrapper}>
                <img src={ringRainbow} alt="Rainbow ring" className={styles.ringRainbow} />
                <img src={profileLogo} alt="Profile" className={styles.avatar} />
              </div>
              <span className={styles.username}>itcareerhub</span>
            </div>
            <button className={styles.moreButton}>
              <img src={optionButtonIcon} alt="More options" className={styles.optionIcon} />
            </button>
          </div>

          <div className={styles.commentsSection}>
            <div className={styles.postContent}>
              <div className={styles.postHeader}>
                <div className={styles.avatarWrapper}>
                  <img src={ringRainbow} alt="Rainbow ring" className={styles.ringRainbow} />
                  <img src={profileLogo} alt="Profile" className={styles.avatar} />
                </div>
                <div className={styles.postTextContainer}>
                  <div className={styles.postDescription}>
                    <div className={styles.firstLine}>
                      <Link to="/my-profile" className={styles.username}>
                        itcareerhub
                      </Link>
                      <span className={styles.firstParagraph}>
                        {postDescription.split("\n\n")[0]}
                      </span>
                    </div>
                    {postDescription.split("\n\n").slice(1).map((paragraph, index) => (
                      <p key={index} className={styles.paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.postTime}>1 day</div>
            </div>

            {comments.map((commentItem) => (
              <div key={commentItem.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <img
                    src={commentItem.avatar}
                    alt={commentItem.username}
                    className={styles.commentAvatar}
                  />
                  <span className={styles.commentUsername}>{commentItem.username}</span>
                  <div className={styles.commentTextContainer}>
                    {commentItem.id === 1 && (
                      <img
                        src={heartSmileIcon}
                        alt="Heart smile"
                        className={styles.commentEmojiLeft}
                      />
                    )}
                    <span className={styles.commentText}>{commentItem.text}</span>
                    {commentItem.id === 1 && (
                      <img
                        src={aplauseSmileIcon}
                        alt="Applause smile"
                        className={styles.commentEmojiRight}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.commentMeta}>
                  <span className={styles.commentTime}>{commentItem.time}</span>
                  <span className={styles.commentLikes}>Likes: {commentItem.likes}</span>
                </div>
                <button
                  className={`${styles.commentLikeButton} ${commentItem.isLiked ? styles.liked : ""}`}
                >
                  {commentItem.id === 2 ? (
                    <img
                      src={whiteHeartIcon}
                      alt="Like comment"
                      className={styles.commentLikeIcon}
                    />
                  ) : (
                    <img
                      src={redHeartIcon}
                      alt="Like comment"
                      className={styles.commentLikeIcon}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton} onClick={handleLike}>
                <img
                  src={whiteHeartIcon}
                  alt="Like"
                  className={`${styles.actionIcon} ${isLiked ? styles.liked : ""}`}
                />
              </button>
              <button className={styles.actionButton}>
                <img src={commentIcon} alt="Comment" className={styles.actionIcon} />
              </button>
            </div>
            <div className={styles.likesCount}>25 likes</div>
            <div className={styles.postTimeBottom}>1 day</div>
          </div>

          <div className={styles.commentForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <button type="button" className={styles.emojiButton}>
                <img src={commentSmileIcon} alt="Emoji" className={styles.emojiIcon} />
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

export default MyPostModal;

