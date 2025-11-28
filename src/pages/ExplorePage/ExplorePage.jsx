import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import styles from "./ExplorePage.module.css";
import image1 from "../../assets/Images/explore/Background(10).png";
import image2 from "../../assets/Images/explore/Background(2).png";
import image3 from "../../assets/Images/explore/Background(3).png";
import image4 from "../../assets/Images/explore/Background(4).png";
import image5 from "../../assets/Images/explore/Background(5).png";
import image6 from "../../assets/Images/explore/Background(6).png";
import image7 from "../../assets/Images/explore/Background(7).png";
import image8 from "../../assets/Images/explore/Background(8).png";
import image9 from "../../assets/Images/explore/Background(9).png";
import image10 from "../../assets/Images/explore/Link.png";

const ExplorePage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div className={styles.imageGrid}>
            <div className={styles.imageItem}>
              <img src={image2} alt="Explore 1" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image3} alt="Explore 2" className={styles.image} />
            </div>
            <div
              className={`${styles.imageItem} ${styles.tallItem} ${styles.tallRight}`}
            >
              <img src={image9} alt="Explore 9" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image4} alt="Explore 3" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image5} alt="Explore 4" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image6} alt="Explore 5" className={styles.image} />
            </div>
            <div
              className={`${styles.imageItem} ${styles.tallItem} ${styles.tallLeft}`}
            >
              <img src={image1} alt="Explore 10" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image7} alt="Explore 6" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image8} alt="Explore 7" className={styles.image} />
            </div>
            <div className={styles.imageItem}>
              <img src={image10} alt="Link" className={styles.image} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default ExplorePage;
