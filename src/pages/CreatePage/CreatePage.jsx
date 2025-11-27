import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import styles from "./CreatePage.module.css";

const CreatePage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}></div>
        <Footer />
      </div>
    </>
  );
};
export default CreatePage;
