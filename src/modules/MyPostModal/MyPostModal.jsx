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
import EditPostModal from "../EditPostModal/EditPostModal";

const MyPostModal = ({
  isOpen,
  onClose,
  postIndex,
  posts,
  onEditPost,
  onDeletePost,
}) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Статические изображения для обратной совместимости
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

  // Определяем текущий пост
  const currentPost = posts && posts[postIndex];
  const isUserPost =
    currentPost && typeof currentPost === "object" && currentPost.image;

  // Получаем изображение
  const currentImage = isUserPost
    ? currentPost.image
    : posts && posts[postIndex]
    ? posts[postIndex]
    : modalImages[postIndex] || modalImage1;

  // Получаем описание
  const defaultDescription =
    "Потрясающие новости пришли к нам из Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажёров, будет представлен на Web Summit 2024 в Португалии🔥\n\nМы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества крутых специалистов, помогающих развивать и очищать нашу планету.\n\nЗанимайте место на бесплатной консультации по ссылке в шапке профиля, чтобы узнать подробности!";

  const postDescription =
    isUserPost && (currentPost.content || currentPost.description)
      ? (currentPost.content || currentPost.description)
      : defaultDescription;

  // Вычисляем время публикации
  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "1 day";

    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInMs = now - postDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"}`;
    }
  };

  const postTime =
    isUserPost && currentPost.createdAt
      ? getTimeAgo(currentPost.createdAt)
      : "1 day";

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

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    // Используем _id для постов из API или id для старых постов
    const postId = currentPost?._id || currentPost?.id;
    if (onDeletePost && isUserPost && postId) {
      onDeletePost(postId);
      setIsEditModalOpen(false);
      onClose();
    } else {
      // Если это не пользовательский пост, просто закрываем модальное окно
      setIsEditModalOpen(false);
    }
  };

  const handleEdit = () => {
    if (onEditPost && isUserPost && currentPost) {
      setIsEditModalOpen(false);
      onClose();
      onEditPost(currentPost);
    } else {
      // Если это не пользовательский пост, просто закрываем модальное окно
      setIsEditModalOpen(false);
    }
  };

  const handleGoToPost = () => {
    setIsEditModalOpen(false);
    // MyPostModal уже открыт, просто закрываем EditPostModal
  };

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsEditModalOpen(false);
      // Можно показать уведомление об успешном копировании
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.imageSection}>
          <img
            src={currentImage}
            alt={`Post ${postIndex + 1}`}
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
              <span className={styles.username}>itcareerhub</span>
            </div>
            <button className={styles.moreButton} onClick={handleMoreClick}>
              <img
                src={optionButtonIcon}
                alt="More options"
                className={styles.optionIcon}
              />
            </button>
          </div>

          <div className={styles.commentsSection}>
            <div className={styles.postContent}>
              <div className={styles.postHeader}>
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
                <div className={styles.postTextContainer}>
                  <div className={styles.postDescription}>
                    {postDescription ? (
                      <>
                        <div className={styles.firstLine}>
                          <Link to="/my-profile" className={styles.username}>
                            itcareerhub
                          </Link>
                          <span className={styles.firstParagraph}>
                            {postDescription.split("\n\n")[0]}
                          </span>
                        </div>
                        {postDescription
                          .split("\n\n")
                          .slice(1)
                          .map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>
                              {paragraph}
                            </p>
                          ))}
                      </>
                    ) : (
                      <div className={styles.firstLine}>
                        <Link to="/my-profile" className={styles.username}>
                          itcareerhub
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.postTime}>{postTime}</div>
            </div>

            {comments.map((commentItem) => (
              <div key={commentItem.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <img
                    src={commentItem.avatar}
                    alt={commentItem.username}
                    className={styles.commentAvatar}
                  />
                  <span className={styles.commentUsername}>
                    {commentItem.username}
                  </span>
                  <div className={styles.commentTextContainer}>
                    {commentItem.id === 1 && (
                      <img
                        src={heartSmileIcon}
                        alt="Heart smile"
                        className={styles.commentEmojiLeft}
                      />
                    )}
                    <span className={styles.commentText}>
                      {commentItem.text}
                    </span>
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
                  <span className={styles.commentLikes}>
                    Likes: {commentItem.likes}
                  </span>
                </div>
                <button
                  className={`${styles.commentLikeButton} ${
                    commentItem.isLiked ? styles.liked : ""
                  }`}
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
                  className={`${styles.actionIcon} ${
                    isLiked ? styles.liked : ""
                  }`}
                />
              </button>
              <button className={styles.actionButton}>
                <img
                  src={commentIcon}
                  alt="Comment"
                  className={styles.actionIcon}
                />
              </button>
            </div>
            <div className={styles.likesCount}>25 likes</div>
            <div className={styles.postTimeBottom}>{postTime}</div>
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
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onGoToPost={handleGoToPost}
        onCopyLink={handleCopyLink}
      />
    </>
  );
};

export default MyPostModal;
