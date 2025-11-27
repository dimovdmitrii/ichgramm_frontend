import Footer from "../../shared/components/Footer/footer";

import Sidebar from "../../shared/components/Sidebar/Sidebar";
import Post from "../../shared/components/Post/Post";
import styles from "./HomePage.module.css";
import endIcon from "../../assets/Images/illo-confirm-refresh.png";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.homePage}>
        <main className={styles.mainContent}>
          <div className={styles.postsGrid}>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div className={styles.endIndicator}>
            <img src={endIcon} alt="End of feed" className={styles.endIcon} />
            <p className={styles.endTitle}>You've seen all the updates</p>
            <p className={styles.endSubtitle}>You have viewed all new publications</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
