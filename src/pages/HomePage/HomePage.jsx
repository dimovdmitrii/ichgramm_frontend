import Footer from "../../shared/components/Footer/footer";

import Sidebar from "../../shared/components/Sidebar/Sidebar";
import Post from "../../shared/components/Post/Post";
import styles from "./HomePage.module.css";
import endIcon from "../../assets/Images/illo-confirm-refresh.png";
import yablokoImage from "../../assets/Images/yabloko-500x.jpg";
import mostInkovImage from "../../assets/Images/most_inkov-500x.jpg";
import ispolzovalImage from "../../assets/Images/ispolzoval-500x.jpg";
import defaultPostImage from "../../assets/Images/Background+Border.png";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.homePage}>
        <main className={styles.mainContent}>
          <div className={styles.postsGrid}>
            <Post postImage={yablokoImage} />
            <Post postImage={mostInkovImage} />
            <Post postImage={ispolzovalImage} />
            <Post postImage={defaultPostImage} />
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
