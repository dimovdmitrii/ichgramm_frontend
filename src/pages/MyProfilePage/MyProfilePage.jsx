import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import MyPostModal from "../../modules/MyPostModal/MyPostModal";
import CreatePostModal from "../../modules/CreatePostModal/CreatePostModal";
import styles from "./MyProfilePage.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import notificationsIcon from "../../assets/icons/sidebar/notifications.svg";
import createIcon from "../../assets/icons/sidebar/create.svg";
import gearIcon from "../../assets/icons/sidebar/gear_9002434.png";
import profile1 from "../../assets/Images/UsersProfile/Profile_Post1.png";
import profile2 from "../../assets/Images/UsersProfile/Profile_Post2.png";
import profile3 from "../../assets/Images/UsersProfile/Profile_Post3.png";
import profile4 from "../../assets/Images/UsersProfile/Profile_Post4.png";
import profile5 from "../../assets/Images/UsersProfile/Profile_Post5.png";
import profile6 from "../../assets/Images/UsersProfile/Profile_Post6.png";
import {
  getProfile,
  getUserPosts,
  deletePost,
} from "../../shared/api/users-api";
import { selectUser } from "../../store/auth/authSelectors";
import { setMyProfileData } from "../../store/profile/profileSlice";

const selectProfileCache = (state) => state.profile;

const MyProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const profileCache = useSelector(selectProfileCache);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [profile, setProfileState] = useState(null);
  const [posts, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("grid");

  const loadProfileData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const profileData = await getProfile();
      setProfileState(profileData);

      const userId = profileData?._id || currentUser?._id;
      let postsData = [];
      if (userId) {
        try {
          postsData = await getUserPosts(userId) || [];
          setPostsState(postsData);
        } catch (postsError) {
          console.error("Failed to load posts:", postsError);
          setPostsState([]);
        }
      } else {
        setPostsState([]);
      }

      if (userId) {
        dispatch(
          setMyProfileData({
            profile: profileData,
            posts: postsData,
            userId: String(userId),
          })
        );
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      setProfileState(null);
      setPostsState([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = currentUser?._id;
    const hasCache =
      profileCache.userId &&
      profileCache.myProfile &&
      String(profileCache.userId) === String(userId);

    if (hasCache) {
      setProfileState(profileCache.myProfile);
      setPostsState(profileCache.myPosts || []);
      setLoading(false);
      loadProfileData(false);
    } else {
      loadProfileData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id]);

  // Слушаем событие создания нового поста — обновляем без лоадинга
  useEffect(() => {
    const handlePostCreated = () => {
      if (currentUser?._id) loadProfileData(false);
    };
    window.addEventListener("postsUpdated", handlePostCreated);
    return () => window.removeEventListener("postsUpdated", handlePostCreated);
  }, [currentUser?._id]);

  // Слушаем событие обновления профиля — обновляем без лоадинга
  useEffect(() => {
    const handleProfileUpdated = () => {
      if (currentUser?._id) loadProfileData(false);
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdated);
  }, [currentUser?._id]);

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

  const handleDeletePost = async (postId) => {
    try {
      // Вызываем API для удаления поста
      await deletePost(postId);
      // Обновляем список постов
      setPostsState((prev) =>
        prev.filter((post) => (post._id || post.id) !== postId)
      );
      if (isModalOpen && selectedPostIndex !== null) {
        setIsModalOpen(false);
        setSelectedPostIndex(null);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete post. Please try again."
      );
    }
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  const handleEditPostSave = async () => {
    // Перезагружаем данные
    try {
      const [profileData, postsData] = await Promise.all([
        getProfile(),
        getUserPosts(currentUser?._id),
      ]);
      setProfileState(profileData);
      setPostsState(postsData || []);
    } catch (error) {
      console.error("Failed to reload data:", error);
    }
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className={styles.pageWrapper}>
          <div className={styles.content}>
            <div className={styles.container}>Loading...</div>
          </div>
        </div>
      </>
    );
  }

  const displayProfile = profile || currentUser;
  const avatarUrl = displayProfile?.avatar || profileLogo;
  const username = displayProfile?.username || "username";
  const fullName = displayProfile?.fullName || displayProfile?.name || "";
  const bio = displayProfile?.bio || "";
  const website = displayProfile?.website || "";
  const postsCount = displayProfile?.postsCount ?? posts.length;
  const followersCount = displayProfile?.followersCount ?? 0;
  const followingCount = displayProfile?.followingCount ?? 0;
  const notificationsCount = 0; // можно подтянуть из API

  const bioLines = bio.split("\n").filter((line) => line.trim());
  const fullBio = bioLines.join("\n");
  const shortBio = bioLines.slice(0, 3).join("\n"); // Показываем первые 3 строки

  const staticPosts = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
  ];

  // Используем посты из API, если они есть, иначе статические посты
  const displayPosts =
    posts.length > 0
      ? posts
      : staticPosts.map((img, idx) => ({ image: img, _id: `static_${idx}` }));

  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        {/* Верхняя полоса (как в Instagram): настройки, username, уведомления */}
        <header className={styles.topBar}>
          <button
            type="button"
            className={styles.topBarIcon}
            onClick={handleEditProfile}
            aria-label="Settings"
          >
            <img src={gearIcon} alt="" className={styles.topBarGearIcon} />
          </button>
          <div className={styles.topBarUsername}>
            <span>{username}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.topBarIconWrap}>
              <img src={notificationsIcon} alt="" className={styles.topBarIconImg} />
              {notificationsCount > 0 && (
                <span className={styles.topBarBadge}>{notificationsCount > 9 ? "9+" : notificationsCount}</span>
              )}
            </span>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            {/* Блок профиля: аватар слева, справа username, статистика, имя, био, кнопки */}
            <div className={styles.header}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarWrapper}>
                  <img src={ringRainbow} alt="" className={styles.ringRainbow} />
                  <img src={avatarUrl} alt="Profile" className={styles.avatar} />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.username}>{username}</h2>
                <div className={styles.stats}>
                  <div className={styles.statItem}><strong>{postsCount}</strong> posts</div>
                  <div className={styles.statItem}><strong>{followersCount}</strong> followers</div>
                  <div className={styles.statItem}><strong>{followingCount}</strong> following</div>
                </div>
                {fullName && <p className={styles.fullName}>{fullName}</p>}
                <div className={styles.bioSection}>
                  <div className={styles.bio}>
                    {bioLines.length > 3 ? (
                      isExpanded ? (
                        <>
                          {bioLines.map((line, index) => <p key={index}>{line}</p>)}
                          <button type="button" className={styles.moreButton} onClick={() => setIsExpanded(false)}>less</button>
                        </>
                      ) : (
                        <>
                          {bioLines.slice(0, 3).map((line, index) => <p key={index}>{line}</p>)}
                          {" ... "}
                          <button type="button" className={styles.moreButton} onClick={() => setIsExpanded(true)}>more</button>
                        </>
                      )
                    ) : (
                      bioLines.map((line, index) => <p key={index}>{line}</p>)
                    )}
                  </div>
                  {website && (
                    <div className={styles.linkContainer}>
                      <img src={linkIcon} alt="" className={styles.linkIcon} />
                      <a href={website.startsWith("http") ? website : `https://${website}`} className={styles.externalLink} target="_blank" rel="noopener noreferrer">{website}</a>
                    </div>
                  )}
                </div>
                <div className={styles.profileActions}>
                  <button type="button" className={styles.editButton} onClick={handleEditProfile}>Edit profile</button>
                  <button type="button" className={styles.archiveButton}>Archived</button>
                </div>
              </div>
            </div>

            {/* Круг "Новое" (сторис/хайлайт) */}
            <div className={styles.storySection}>
              <button type="button" className={styles.storyNew}>
                <span className={styles.storyNewIcon}>
                  <img src={createIcon} alt="" />
                </span>
                <span className={styles.storyNewLabel}>New</span>
              </button>
            </div>

            {/* Вкладки: Сетка, Reels, Saved, Tagged */}
            <div className={styles.tabs}>
              <button type="button" className={`${styles.tab} ${activeTab === "grid" ? styles.tabActive : ""}`} onClick={() => setActiveTab("grid")} aria-label="Posts">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button type="button" className={`${styles.tab} ${activeTab === "reels" ? styles.tabActive : ""}`} onClick={() => setActiveTab("reels")} aria-label="Reels">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M10 8l6 4-6 4V8z"/></svg>
              </button>
              <button type="button" className={`${styles.tab} ${activeTab === "saved" ? styles.tabActive : ""}`} onClick={() => setActiveTab("saved")} aria-label="Saved">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </button>
              <button type="button" className={`${styles.tab} ${activeTab === "tagged" ? styles.tabActive : ""}`} onClick={() => setActiveTab("tagged")} aria-label="Tagged">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
            </div>

            {/* Сетка постов (пока только для вкладки grid) */}
            <div className={styles.postsGrid}>
              {activeTab === "grid" && displayPosts.map((post, index) => {
                const postImage = post.image || profileLogo;
                const postKey = post._id || index;
                return (
                  <div key={postKey} className={styles.postItem} onClick={() => handlePostClick(index)}>
                    <img src={postImage} alt={`Post ${index + 1}`} className={styles.postImage} />
                  </div>
                );
              })}
              {activeTab === "grid" && displayPosts.length === 0 && <div className={styles.noPosts}>No posts yet</div>}
              {activeTab !== "grid" && <div className={styles.noPosts}>No content yet</div>}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <MyPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        postIndex={selectedPostIndex}
        posts={displayPosts}
        onDeletePost={handleDeletePost}
        onEditPost={handleEditPost}
        username={currentUser?.username || profile?.username || "itcareerhub"}
        avatar={profile?.avatar || profileLogo}
        isOwnPost={true}
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
