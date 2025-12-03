import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import Register from "../../../modules/RegisterForm/Register";
import logoIcon from "../../../assets/icons/Logo_Text_Max.svg";

const RegisterPage = () => {
  return (
    <div className={styles.registerPage}>
      <div className={styles.section}>
        <div className={styles.main}>
          <div className={styles.article}>
            <div className={styles.formContainer}>
              <div className={styles.registerCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={logoIcon}
                    alt="ICHGRAMM Logo"
                    className={styles.logo}
                  />
                </div>
                <Register />
              </div>
              <div className={styles.loginCard}>
                <div className={styles.loginContainer}>
                  <span className={styles.loginText}>Have an account? </span>
                  <Link to="/" className={styles.loginLink}>
                    Log in
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

export default RegisterPage;
