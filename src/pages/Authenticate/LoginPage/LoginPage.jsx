import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import LoginForm from "../../../modules/LoginForm/LoginForm";
import imgBackground from "../../../assets/Images/Main_Background.png";
import logoIcon from "../../../assets/icons/ICHGRAM-Text.svg";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.section}>
        <div className={styles.main}>
          <div className={styles.article}>
            <img
              src={imgBackground}
              alt=""
              className={styles.backgroundImage}
            />
            <div className={styles.formContainer}>
              <div className={styles.loginCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={logoIcon}
                    alt="ICHGRAMM Logo"
                    className={styles.logo}
                  />
                </div>
                <LoginForm />
              </div>
              <div className={styles.signupCard}>
                <div className={styles.signupContainer}>
                  <span className={styles.signupText}>
                    Don't have an account?{" "}
                  </span>
                  <Link to="/register" className={styles.signupLink}>
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
