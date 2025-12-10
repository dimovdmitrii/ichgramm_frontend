import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import MyPostModal from "../../modules/MyPostModal/MyPostModal";
import CreatePostModal from "../../modules/CreatePostModal/CreatePostModal";
import styles from "./MyProfilePage.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import profile1 from "../../assets/Images/UsersProfile/Profile_Post1.png";
import profile2 from "../../assets/Images/UsersProfile/Profile_Post2.png";
import profile3 from "../../assets/Images/UsersProfile/Profile_Post3.png";
import profile4 from "../../assets/Images/UsersProfile/Profile_Post4.png";
import profile5 from "../../assets/Images/UsersProfile/Profile_Post5.png";
import profile6 from "../../assets/Images/UsersProfile/Profile_Post6.png";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(() => {
    // Загружаем сохраненное изображение из localStorage при монтировании
    const savedAvatar = localStorage.getItem("profileAvatar");
    return savedAvatar || null;
  });

  // Статические посты
  const staticPosts = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
  ];

  // Загружаем пользовательские посты из localStorage
  const [userPosts, setUserPosts] = useState(() => {
    const savedPosts = localStorage.getItem("userPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // Объединяем пользовательские посты со статическими
  // Сначала пользовательские (новые), потом статические
  const allPosts = [...userPosts, ...staticPosts];

  const fullBio = "БЕСПЛАТНЫЙ ПОДБОР ПРОФЕССИИ С НУЛЯ";
  const shortBio = "БЕСПЛАТНЫЙ";

  // Синхронизируем изменения аватара из localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedAvatar = localStorage.getItem("profileAvatar");
      if (savedAvatar) {
        setAvatarPreview(savedAvatar);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Также проверяем при монтировании
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Слушаем обновления постов
  useEffect(() => {
    const handlePostsUpdate = () => {
      const savedPosts = localStorage.getItem("userPosts");
      if (savedPosts) {
        setUserPosts(JSON.parse(savedPosts));
      }
    };

    window.addEventListener("postsUpdated", handlePostsUpdate);

    // Также проверяем при монтировании
    const savedPosts = localStorage.getItem("userPosts");
    if (savedPosts) {
      setUserPosts(JSON.parse(savedPosts));
    }

    return () => {
      window.removeEventListener("postsUpdated", handlePostsUpdate);
    };
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handlePostClick = (index) => {
    setSelectedPostIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostIndex(null);
  };

  const handleDeletePost = (postId) => {
    // Получаем существующие посты
    const existingPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");

    // Удаляем пост с указанным ID
    const updatedPosts = existingPosts.filter((post) => post.id !== postId);

    // Сохраняем обновленный список
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));

    // Обновляем состояние
    setUserPosts(updatedPosts);

    // Если удаленный пост был открыт, закрываем модальное окно
    if (isModalOpen && selectedPostIndex !== null) {
      const currentPost = allPosts[selectedPostIndex];
      if (
        currentPost &&
        typeof currentPost === "object" &&
        currentPost.id === postId
      ) {
        setIsModalOpen(false);
        setSelectedPostIndex(null);
      }
    }

    // Отправляем событие для обновления
    window.dispatchEvent(new Event("postsUpdated"));
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  const handleEditPostSave = () => {
    // После сохранения редактированного поста обновляем список
    const savedPosts = localStorage.getItem("userPosts");
    if (savedPosts) {
      setUserPosts(JSON.parse(savedPosts));
    }
    window.dispatchEvent(new Event("postsUpdated"));
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={ringRainbow}
                    alt="Rainbow ring"
                    className={styles.ringRainbow}
                  />
                  <img
                    src={avatarPreview || profileLogo}
                    alt="Profile"
                    className={styles.avatar}
                  />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.usernameSection}>
                  <h2 className={styles.username}>itcareerhub</h2>
                  <button
                    className={styles.editButton}
                    onClick={handleEditProfile}
                  >
                    Edit profile
                  </button>
                </div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span>{allPosts.length} posts</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>9 993 followers</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>59 following</span>
                  </div>
                </div>
                <div className={styles.bioSection}>
                  <div className={styles.bio}>
                    <p>
                      • Гарантия помощи с трудоустройством в ведущие IT-компании
                    </p>
                    <p>• Выпускники зарабатывают от 45к евро</p>
                    <p>
                      {isExpanded ? fullBio : shortBio}
                      {!isExpanded && (
                        <span className={styles.moreLink}>
                          {" ... "}
                          <button
                            className={styles.moreButton}
                            onClick={() => setIsExpanded(true)}
                          >
                            more
                          </button>
                        </span>
                      )}
                      {isExpanded && (
                        <span className={styles.moreLink}>
                          {" "}
                          <button
                            className={styles.moreButton}
                            onClick={() => setIsExpanded(false)}
                          >
                            less
                          </button>
                        </span>
                      )}
                    </p>
                  </div>
                  <div className={styles.linkContainer}>
                    <img
                      src={linkIcon}
                      alt="Link icon"
                      className={styles.linkIcon}
                    />
                    <a
                      href="https://bit.ly/3rpiIbh"
                      className={styles.externalLink}
                    >
                      bit.ly/3rpiIbh
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.postsGrid}>
              {allPosts.map((post, index) => {
                // Если это объект с полями image и description, это пользовательский пост
                const postImage =
                  typeof post === "object" && post.image ? post.image : post;
                const postKey =
                  typeof post === "object" && post.id ? post.id : index;

                return (
                  <div
                    key={postKey}
                    className={styles.postItem}
                    onClick={() => handlePostClick(index)}
                  >
                    <img
                      src={postImage}
                      alt={`Post ${index + 1}`}
                      className={styles.postImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <MyPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        postIndex={selectedPostIndex}
        posts={allPosts}
        onDeletePost={handleDeletePost}
        onEditPost={handleEditPost}
      />
      <CreatePostModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        editPost={postToEdit}
        onSave={handleEditPostSave}
      />
    </>
  );
};

export default MyProfilePage;
