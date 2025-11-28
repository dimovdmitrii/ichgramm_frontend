import { Link } from "react-router-dom";
import styles from "../PrivacyTermsPage.module.css";

const LearnMore = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Learn More</h1>
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            When you sign up for ICHGRAM, people who use our service may have uploaded your contact information to help you connect with friends and family. This feature allows you to discover and connect with people you know who are already using our platform.
          </p>
          <p className={styles.paragraph}>
            We use contact information from your device's address book, which may have been uploaded by other users, to suggest connections and help you find people you know. This information is used solely for the purpose of friend suggestions and is not shared with third parties. You can control this feature in your account settings and choose whether to allow contact syncing.
          </p>
          <p className={styles.paragraph}>
            Your privacy is important to us. If you prefer not to use this feature, you can disable contact syncing at any time. We only use contact information to improve your experience on ICHGRAM and help you stay connected with the people who matter most to you.
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <Link to="/register" className={styles.acceptButton}>
            Accept
          </Link>
          <Link to="/" className={styles.declineButton}>
            Decline
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
