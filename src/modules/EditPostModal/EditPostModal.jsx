import styles from "./EditPostModal.module.css";

const EditPostModal = ({
  isOpen,
  onClose,
  onDelete,
  onEdit,
  onGoToPost,
  onCopyLink,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.deleteButton} onClick={onDelete}>
          Delete
        </button>
        <button className={styles.menuButton} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.menuButton} onClick={onGoToPost}>
          Go to post
        </button>
        <button className={styles.menuButton} onClick={onCopyLink}>
          Copy link
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditPostModal;








