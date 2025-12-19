import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SearchModal.module.css";
import clearButtonIcon from "../../assets/icons/clear_Button.svg";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import {
  searchUsers,
  getProfileByUsername,
  getRecentSearches,
  addRecentSearch,
} from "../../shared/api/users-api";
import { selectUser } from "../../store/auth/authSelectors";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Загружаем недавние поиски из БД
  useEffect(() => {
    const loadRecentSearches = async () => {
      if (isOpen && currentUser?._id) {
        try {
          const searches = await getRecentSearches();
          // Исключаем текущего пользователя из недавних поисков
          const filtered = searches.filter(
            (user) =>
              user._id !== currentUser._id &&
              user.username !== currentUser?.username
          );
          setRecentSearches(filtered);
        } catch (error) {
          console.error("Failed to load recent searches:", error);
          setRecentSearches([]);
        }
      }
    };

    loadRecentSearches();
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

        // Сохраняем только первого найденного пользователя в недавние поиски (не блокируем UI)
        if (filteredResults.length > 0 && currentUser?._id) {
          // Выполняем в фоне, не блокируя отображение результатов
          addRecentSearch(filteredResults[0].username)
            .then(() => {
              // Обновляем список недавних поисков в фоне
              getRecentSearches()
                .then((searches) => {
                  const filtered = searches.filter(
                    (user) =>
                      user._id !== currentUser._id &&
                      user.username !== currentUser?.username
                  );
                  setRecentSearches(filtered);
                })
                .catch((error) => {
                  console.error("Failed to reload recent searches:", error);
                });
            })
            .catch((error) => {
              console.error("Failed to add recent search:", error);
            });
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

  const handleUserClick = (user) => {
    // Сохраняем в недавние поиски при клике (не блокируем навигацию)
    if (currentUser?._id && user) {
      addRecentSearch(user.username)
        .then(() => {
          // Обновляем список недавних поисков в фоне
          getRecentSearches()
            .then((searches) => {
              const filtered = searches.filter(
                (u) =>
                  u._id !== currentUser._id &&
                  u.username !== currentUser?.username
              );
              setRecentSearches(filtered);
            })
            .catch((error) => {
              console.error("Failed to reload recent searches:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to save recent search:", error);
        });
    }

    navigate(`/other-profile/${user.username || user}`);
    onClose();
  };

  const handleRecentUserClick = (user) => {
    navigate(`/other-profile/${user.username || user}`);
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
                    onClick={() => handleUserClick(user)}
                  >
                    <img
                      src={user.avatar || profileLogo}
                      alt={user.username}
                      className={styles.avatar}
                      onError={(e) => {
                        // Если изображение не загрузилось, используем дефолтное
                        e.target.src = profileLogo;
                      }}
                    />
                    <span className={styles.username}>{user.username}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No users found</div>
              )}
            </div>
            {!loading &&
              searchResults.length > 0 &&
              recentSearches.length > 0 && (
                <>
                  <h3 className={styles.subtitle}>Recent</h3>
                  <div className={styles.recentList}>
                    {recentSearches.map((user) => (
                      <div
                        key={user._id || user.username}
                        className={styles.recentItem}
                        onClick={() => handleRecentUserClick(user)}
                      >
                        <img
                          src={user.avatar || profileLogo}
                          alt={user.username}
                          className={styles.avatar}
                          onError={(e) => {
                            // Если изображение не загрузилось, используем дефолтное
                            e.target.src = profileLogo;
                          }}
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
                    onClick={() => handleRecentUserClick(user)}
                  >
                    <img
                      src={user.avatar || profileLogo}
                      alt={user.username}
                      className={styles.avatar}
                      onError={(e) => {
                        // Если изображение не загрузилось, используем дефолтное
                        e.target.src = profileLogo;
                      }}
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
