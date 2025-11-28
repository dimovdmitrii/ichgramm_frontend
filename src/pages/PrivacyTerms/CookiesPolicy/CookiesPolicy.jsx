import { Link } from "react-router-dom";
import styles from "../PrivacyTermsPage.module.css";

const CookiesPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Cookies Policy</h1>
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            ICHGRAM uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files that are placed on your device when you visit our website. This policy explains what cookies we use, why we use them, and how you can manage your cookie preferences.
          </p>
          <p className={styles.paragraph}>
            We use essential cookies that are necessary for the website to function properly, such as maintaining your login session and remembering your preferences. We also use analytics cookies to understand how visitors interact with our platform, which helps us improve our services and user experience. These cookies do not collect personally identifiable information.
          </p>
          <p className={styles.paragraph}>
            You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies, but doing so may affect your ability to use certain features of our platform. By continuing to use ICHGRAM, you consent to our use of cookies as described in this policy.
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

export default CookiesPolicy;
