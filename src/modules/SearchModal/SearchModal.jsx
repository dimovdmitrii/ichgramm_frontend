import { useEffect, useState } from "react";
import styles from "./SearchModal.module.css";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import clearButtonIcon from "../../assets/icons/clear_Button.svg";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const recentSearches = [
    {
      id: 1,
      username: "sashaa",
      avatar: sashaaAvatar,
    },
  ];

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2 className={styles.title}>Search</h2>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />
          {searchValue && (
            <button
              onClick={handleClearSearch}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <img src={clearButtonIcon} alt="Clear" className={styles.clearIcon} />
            </button>
          )}
        </div>
        <h3 className={styles.subtitle}>Recent</h3>
        <div className={styles.recentList}>
          {recentSearches.map((item) => (
            <div key={item.id} className={styles.recentItem}>
              <img
                src={item.avatar}
                alt={item.username}
                className={styles.avatar}
              />
              <span className={styles.username}>{item.username}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchModal;

