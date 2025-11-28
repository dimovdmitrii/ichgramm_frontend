import { Link } from "react-router-dom";
import styles from "../PrivacyTermsPage.module.css";

const Terms = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Use</h1>
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            <strong>Effective Date: November 28, 2025</strong>
          </p>
          <p className={styles.paragraph}>
            Welcome to IchGram! These Terms of Use describe the rules for using our service. By using IchGram, you agree to these terms.
          </p>
          <p className={styles.paragraph}>
            <strong>1. IchGram Service</strong>
          </p>
          <p className={styles.paragraph}>
            We provide a platform for sharing photos and videos, communicating with friends, and creating communities. Our service includes:
          </p>
          <p className={styles.paragraph}>
            • Posting photo and video content<br />
            • Messaging other users<br />
            • Viewing and interacting with other users' content<br />
            • A personalized news feed
          </p>
          <p className={styles.paragraph}>
            <strong>2. Who Can Use IchGram</strong>
          </p>
          <p className={styles.paragraph}>
            You may use IchGram if:
          </p>
          <p className={styles.paragraph}>
            • You are at least 13 years old<br />
            • You have not been banned for violating our terms<br />
            • You comply with the laws of your country<br />
            • Your account has not been previously removed for violations
          </p>
          <p className={styles.paragraph}>
            <strong>3. What You Cannot Do</strong>
          </p>
          <p className={styles.paragraph}>
            We want IchGram to remain a safe and open place for everyone. You may not:
          </p>
          <p className={styles.paragraph}>
            • Post illegal content or content that infringes others' rights<br />
            • Use automated tools to create accounts or post content<br />
            • Collect information about users without their consent<br />
            • Bully, harass, or insult other users<br />
            • Post spam or misleading content<br />
            • Impersonate other people
          </p>
          <p className={styles.paragraph}>
            <strong>4. Your Content</strong>
          </p>
          <p className={styles.paragraph}>
            You own your content. You retain all rights to the content you publish on IchGram.
          </p>
          <p className={styles.paragraph}>
            However, by posting content, you grant us a non-exclusive license to use, distribute, and display your content within the operation of the service.
          </p>
          <p className={styles.paragraph}>
            You are responsible for the content you post and confirm that you have all necessary rights to publish it.
          </p>
          <p className={styles.paragraph}>
            <strong>5. Privacy</strong>
          </p>
          <p className={styles.paragraph}>
            Your privacy is important to us. For detailed information on how we collect and use your data, please refer to our Privacy Policy.
          </p>
          <p className={styles.paragraph}>
            <strong>6. Changes to the Service</strong>
          </p>
          <p className={styles.paragraph}>
            We constantly improve our service. We may add or remove features, and we may suspend or discontinue the service entirely.
          </p>
          <p className={styles.paragraph}>
            We will try to notify you in advance of any significant changes that negatively affect your rights.
          </p>
          <p className={styles.paragraph}>
            <strong>7. Deleting Your Account</strong>
          </p>
          <p className={styles.paragraph}>
            You may delete your account at any time through the settings. After deletion, your profile and content will be removed within 30 days.
          </p>
          <p className={styles.paragraph}>
            We may delete or disable your account if you violate our Terms of Use or create risks for IchGram or other users.
          </p>
          <p className={styles.paragraph}>
            <strong>8. Limitation of Liability</strong>
          </p>
          <p className={styles.paragraph}>
            We provide IchGram "as is," without any warranties. To the extent permitted by law, we are not liable for any indirect, incidental, or consequential damages.
          </p>
          <p className={styles.paragraph}>
            <strong>9. Disputes</strong>
          </p>
          <p className={styles.paragraph}>
            If you encounter any issues, we recommend contacting us first to try resolving the matter informally.
          </p>
          <p className={styles.paragraph}>
            These terms are governed by the laws of the country in which our company is registered.
          </p>
          <p className={styles.paragraph}>
            <strong>10. Updates to the Terms</strong>
          </p>
          <p className={styles.paragraph}>
            We may update these terms from time to time. If the changes are significant, we will notify you (for example, through the service or via email) before they take effect.
          </p>
          <p className={styles.paragraph}>
            By continuing to use IchGram after the updated terms take effect, you agree to the revised terms.
          </p>
          <p className={styles.paragraph}>
            If you have any questions about these terms, please contact us at support@ichgram.com.
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

export default Terms;
