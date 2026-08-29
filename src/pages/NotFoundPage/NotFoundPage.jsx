import Sidebar from "../../shared/components/Sidebar/Sidebar";
import Footer from "../../shared/components/Footer/footer";
import mainBackground from "../../assets/Images/Auth_Illustration.svg";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <div className={styles.backgroundContainer}>
            <div className={styles.imageWrapper}>
              <img
                src={mainBackground}
                alt=""
                className={styles.mainBackgroundImage}
              />
            </div>
            <div className={styles.errorMessage}>
              <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>
              <p className={styles.description}>
                We're sorry, but the page you're looking for doesn't seem to
                exist. If you typed the URL manually, please double-check the
                spelling. If you clicked on a link, it may be outdated or
                broken.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;
