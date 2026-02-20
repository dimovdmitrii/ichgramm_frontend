import { FC, useState, useRef, useEffect } from "react";
import styles from "./Post.module.css";
import sashaaAvatar from "../../../assets/Images/sashaa.jpg";
import defaultPostImage from "../../../assets/Images/Background+Border.png";
import commentIcon from "../../../assets/icons/Button_Commenting.svg";
import whiteHeartIcon from "../../../assets/icons/posts_icons/white_heart.svg";
import redHeartIcon from "../../../assets/icons/posts_icons/Red_Heart.svg";
import ringRainbow from "../../../assets/Images/ring-rainbow.png";

interface PostProps {
  postImage?: string;
}

const Post: FC<PostProps> = ({ postImage }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCommentInput && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [showCommentInput]);

  const handleCommentIconClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (trimmed) {
      setComments((prev) => [...prev, trimmed]);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

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
        <img
          src={postImage || defaultPostImage}
          alt="Post"
          className={styles.postImage}
        />
      </div>
      <div className={styles.postActions}>
        <div className={styles.actionIcons}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => setIsLiked((prev) => !prev)}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <img
              src={isLiked ? redHeartIcon : whiteHeartIcon}
              alt="Like"
              className={styles.likeIcon}
            />
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleCommentIconClick}
            aria-label="Add a comment"
          >
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
        {comments.length > 0 && (
          <div className={styles.addedComments}>
            {comments.map((text, i) => (
              <div key={i} className={styles.addedComment}>
                <span className={styles.captionUsername}>You</span>
                <span className={styles.captionText}> {text}</span>
              </div>
            ))}
          </div>
        )}
        <button className={styles.viewComments}>View all comments (732)</button>
        {showCommentInput && (
          <form
            onSubmit={handleCommentSubmit}
            className={styles.commentForm}
          >
            <input
              ref={commentInputRef}
              type="text"
              className={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              aria-label="Comment"
            />
            <button
              type="submit"
              className={styles.commentSubmitButton}
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </form>
        )}
      </div>
    </article>
  );
};

export default Post;
