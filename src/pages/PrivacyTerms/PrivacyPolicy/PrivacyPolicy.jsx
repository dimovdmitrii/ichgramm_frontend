import { Link } from "react-router-dom";
import styles from "../PrivacyTermsPage.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            At ICHGRAM, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. We are committed to protecting your personal data and ensuring transparency about our data practices.
          </p>
          <p className={styles.paragraph}>
            When you create an account, we collect information such as your email address, username, and profile information. We use this information to provide and improve our services, personalize your experience, and communicate with you. We do not sell your personal information to third parties. Your data is stored securely and is only shared in accordance with this policy or as required by law.
          </p>
          <p className={styles.paragraph}>
            You have the right to access, update, or delete your personal information at any time through your account settings. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. If you have any questions about this Privacy Policy, please contact us through our support channels.
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

export default PrivacyPolicy;
