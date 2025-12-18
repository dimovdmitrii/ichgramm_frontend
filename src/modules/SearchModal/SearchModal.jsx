import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SearchModal.module.css";
import clearButtonIcon from "../../assets/icons/clear_Button.svg";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { searchUsers } from "../../shared/api/users-api";
import { selectUser } from "../../store/auth/authSelectors";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Загружаем недавние поиски из localStorage
  useEffect(() => {
    if (isOpen && currentUser?._id) {
      try {
        const stored = localStorage.getItem(`recentSearches_${currentUser._id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Исключаем текущего пользователя из недавних поисков
          const filtered = parsed.filter(
            (user) =>
              user._id !== currentUser._id &&
              user.username !== currentUser?.username
          );
          setRecentSearches(filtered);
        }
      } catch (error) {
        console.error("Failed to load recent searches:", error);
      }
    }
  }, [isOpen, currentUser?._id]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchValue.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchUsers(searchValue.trim());
        // Исключаем текущего залогиненного пользователя из результатов
        const filteredResults = (results || []).filter(
          (user) =>
            user._id !== currentUser?._id &&
            user.username !== currentUser?.username
        );
        setSearchResults(filteredResults);
        
        // Сохраняем результаты в недавние поиски (только минимальные данные)
        if (filteredResults.length > 0 && currentUser?._id) {
          try {
            const stored = localStorage.getItem(`recentSearches_${currentUser._id}`);
            const recent = stored ? JSON.parse(stored) : [];
            
            // Добавляем новые результаты, исключая дубликаты
            // Сохраняем только минимальные данные: _id, username, avatar (URL, не base64)
            filteredResults.forEach((user) => {
              const exists = recent.find(
                (r) => r._id === user._id || r.username === user.username
              );
              if (!exists) {
                // Сохраняем только минимальные данные
                const minimalUser = {
                  _id: user._id,
                  username: user.username,
                  avatar: user.avatar && !user.avatar.startsWith('data:') ? user.avatar : null, // Только URL, не base64
                };
                recent.unshift(minimalUser);
              }
            });
            
            // Ограничиваем до 5 недавних поисков (уменьшили с 10)
            const limited = recent.slice(0, 5);
            const limitedString = JSON.stringify(limited);
            
            // Проверяем размер перед сохранением (максимум 50KB)
            if (limitedString.length < 50 * 1024) {
              localStorage.setItem(
                `recentSearches_${currentUser._id}`,
                limitedString
              );
              setRecentSearches(limited);
            } else {
              console.warn("Recent searches data too large, skipping save");
            }
          } catch (error) {
            console.error("Failed to save recent searches:", error);
            // Если ошибка QuotaExceededError, очищаем старые данные и пробуем снова
            if (error.name === 'QuotaExceededError') {
              try {
                localStorage.removeItem(`recentSearches_${currentUser._id}`);
                console.log("Cleared old recent searches due to quota exceeded");
              } catch (clearError) {
                console.error("Failed to clear recent searches:", clearError);
              }
            }
          }
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  if (!isOpen) return null;

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  const handleUserClick = (username) => {
    navigate(`/other-profile/${username}`);
    onClose();
  };

  const handleRecentUserClick = (username) => {
    navigate(`/other-profile/${username}`);
    onClose();
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
              <img
                src={clearButtonIcon}
                alt="Clear"
                className={styles.clearIcon}
              />
            </button>
          )}
        </div>
        {searchValue && (
          <>
            <div className={styles.searchResults}>
              {loading ? (
                <div className={styles.loading}>Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user._id || user.username}
                    className={styles.searchItem}
                    onClick={() => handleUserClick(user.username)}
                  >
                    <img
                      src={user.avatar || profileLogo}
                      alt={user.username}
                      className={styles.avatar}
                    />
                    <span className={styles.username}>{user.username}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No users found</div>
              )}
            </div>
            {!loading && searchResults.length > 0 && recentSearches.length > 0 && (
              <>
                <h3 className={styles.subtitle}>Recent</h3>
                <div className={styles.recentList}>
                  {recentSearches.map((user) => (
                    <div
                      key={user._id || user.username}
                      className={styles.recentItem}
                      onClick={() => handleRecentUserClick(user.username)}
                    >
                      <img
                        src={user.avatar || profileLogo}
                        alt={user.username}
                        className={styles.avatar}
                      />
                      <span className={styles.username}>{user.username}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {!searchValue && (
          <>
            <h3 className={styles.subtitle}>Recent</h3>
            <div className={styles.recentList}>
              {recentSearches.length > 0 ? (
                recentSearches.map((user) => (
                  <div
                    key={user._id || user.username}
                    className={styles.recentItem}
                    onClick={() => handleRecentUserClick(user.username)}
                  >
                    <img
                      src={user.avatar || profileLogo}
                      alt={user.username}
                      className={styles.avatar}
                    />
                    <span className={styles.username}>{user.username}</span>
                  </div>
                ))
              ) : (
                <div className={styles.recentItem}>
                  <span className={styles.noRecent}>No recent searches</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchModal;
