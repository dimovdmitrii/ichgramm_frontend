import styles from "./Post.module.css";
import sashaaAvatar from "../../../assets/Images/sashaa.jpg";
import postImage from "../../../assets/Images/Background+Border.png";
import commentIcon from "../../../assets/icons/Button_Commenting.svg";
import likeIcon from "../../../assets/icons/sidebar/notifications.svg";
import ringRainbow from "../../../assets/Images/ring-rainbow.png";

const Post = () => {
  return (
    <article className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <img src={ringRainbow} alt="" className={styles.ringRainbow} />
            <img src={sashaaAvatar} alt="sashaa" className={styles.avatar} />
          </div>
          <div className={styles.userDetails}>
            <span className={styles.username}>sashaa</span>
            <span className={styles.separator}>•</span>
            <span className={styles.time}>2 wek</span>
            <span className={styles.separator}>•</span>
          </div>
        </div>
        <button className={styles.followButton}>follow</button>
      </div>
      <div className={styles.postImageContainer}>
        <img src={postImage} alt="Post" className={styles.postImage} />
      </div>
      <div className={styles.postActions}>
        <div className={styles.actionIcons}>
          <button className={styles.actionButton}>
            <img src={likeIcon} alt="Like" className={styles.likeIcon} />
          </button>
          <button className={styles.actionButton}>
            <img
              src={commentIcon}
              alt="Comment"
              className={styles.commentIcon}
            />
          </button>
        </div>
      </div>
      <div className={styles.postContent}>
        <div className={styles.likes}>101 824 likes</div>
        <div className={styles.caption}>
          <span className={styles.captionUsername}>Sashaa</span>
          <span className={styles.captionText}> It's golden, Ponyboy!</span>
        </div>
        <div className={styles.comments}>
          <span className={styles.commentUsername}>heyyyyy</span>
          <span className={styles.commentText}> | M... </span>
          <span className={styles.moreText}>more</span>
        </div>
        <button className={styles.viewComments}>View all comments (732)</button>
      </div>
    </article>
  );
};

export default Post;
