import styles from "./ResetPage.module.css";
import ResetForm from "../../../modules/ResetForm/ResetForm";

const ResetPage = () => {
  return (
    <div className={styles.resetPage}>
      <div className={styles.resetCard}>
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
