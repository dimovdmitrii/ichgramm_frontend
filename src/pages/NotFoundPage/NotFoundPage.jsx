import Sidebar from "../../shared/components/Sidebar/Sidebar";
import Footer from "../../shared/components/Footer/footer";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <div className={styles.backgroundContainer}>
            <div className={styles.phonesContainer}>
              <div className={`${styles.phoneWrapper} ${styles.phoneBack}`}>
                <div className={styles.phoneContainer}>
                  <img
                    src="https://www.figma.com/api/mcp/asset/e5c91df0-fa66-478a-b3af-50fe42ebc9dc"
                    alt="Phone background"
                    className={styles.phoneBackground}
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/fd14f1e6-78d3-4be4-a7a0-e32ed85dc516"
                    alt="Phone screenshot"
                    className={styles.phoneImage}
                  />
                </div>
              </div>
              <div className={`${styles.phoneWrapper} ${styles.phoneFront}`}>
                <div className={styles.phoneContainer}>
                  <img
                    src="https://www.figma.com/api/mcp/asset/e5c91df0-fa66-478a-b3af-50fe42ebc9dc"
                    alt="Phone background"
                    className={styles.phoneBackground}
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/fd14f1e6-78d3-4be4-a7a0-e32ed85dc516"
                    alt="Phone screenshot"
                    className={styles.phoneImage}
                  />
                </div>
              </div>
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
