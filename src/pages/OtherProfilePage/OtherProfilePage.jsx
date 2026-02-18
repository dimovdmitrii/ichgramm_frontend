import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import ChatModal from "../../modules/ChatModal/ChatModal";
import MyPostModal from "../../modules/MyPostModal/MyPostModal";

import styles from "./OtherProfilePage.module.css";

import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import createIcon from "../../assets/icons/sidebar/create.svg";
import profile1 from "../../assets/Images/UsersProfile/Profile_Post1.png";
import profile2 from "../../assets/Images/UsersProfile/Profile_Post2.png";
import profile3 from "../../assets/Images/UsersProfile/Profile_Post3.png";
import profile4 from "../../assets/Images/UsersProfile/Profile_Post4.png";
import profile5 from "../../assets/Images/UsersProfile/Profile_Post5.png";
import profile6 from "../../assets/Images/UsersProfile/Profile_Post6.png";
import nikitaAvatar from "../../assets/Images/nikita.jpg";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import {
  getProfileByUsername,
  getUserPosts,
  followUser,
  unfollowUser,
} from "../../shared/api/users-api";

const OtherProfilePage = () => {
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();
  const username = routeUsername || "user";

  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profile, setProfileState] = useState(null);
  const [posts, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("grid");

  const staticPosts = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);

        // Загружаем профиль
        const profileData = await getProfileByUsername(username);
        setProfileState(profileData);

        // Обновляем followers и isFollowing из данных API
        if (profileData) {
          setFollowersCount(profileData.followersCount ?? null);
          setIsFollowing(profileData.isFollowing || false);
        }

        // Загружаем посты параллельно, если есть userId
        const userId = profileData?._id;
        if (userId) {
          try {
            console.log("Loading posts for user:", userId);
            const postsData = await getUserPosts(userId);
            console.log("Posts received:", postsData);
            setPostsState(postsData || []);
          } catch (postsError) {
            console.error("Failed to load posts:", postsError);
            setPostsState([]);
          }
        } else {
          console.error("No userId found");
          setPostsState([]);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        setPostsState([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfileData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Убрали сохранение в localStorage - данные должны приходить с API
  // useEffect для загрузки followers и isFollowing из API уже есть в loadProfileData

  const avatarSrc = useMemo(() => {
    if (profile?.avatar) return profile.avatar;
    if (username === "nikiita") return nikitaAvatar;
    if (username === "sashaa") return sashaaAvatar;
    return profileLogo;
  }, [profile, username]);

  const displayUsername = profile?.username || username;
  const fullName = profile?.fullName || profile?.name || "";
  const bio = profile?.bio || "";
  const website = profile?.website || "";
  const postsCount = profile?.postsCount ?? posts.length;
  const profileFollowersCount = profile?.followersCount ?? 0;
  const followingCount = profile?.followingCount ?? 0;

  // Используем локальное состояние followersCount, если оно установлено, иначе значение из профиля
  // followersCount может быть 0, поэтому проверяем на null/undefined
  const displayFollowersCount =
    followersCount !== null && followersCount !== undefined
      ? followersCount
      : profileFollowersCount;

  const bioLines = bio ? bio.split("\n").filter((line) => line.trim()) : [];
  const fullBio = bioLines.join("\n");
  const shortBio = bioLines[0] || "";

  // Fallback to static bio if no bio from API
  const displayFullBio = fullBio || "БЕСПЛАТНЫЙ ПОДБОР ПРОФЕССИИ С НУЛЯ";
  const displayShortBio = shortBio || "БЕСПЛАТНЫЙ";

  const handleToggleFollow = async () => {
    const previousFollowingState = isFollowing;
    const previousFollowersCount = followersCount || profileFollowersCount;

    // Оптимистичное обновление - обновляем моментально
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);

    // Вычисляем новое значение счетчика на основе текущего отображаемого значения
    // Используем displayFollowersCount для моментального обновления в обоих случаях
    const currentCount = displayFollowersCount;
    const newCount = newFollowingState
      ? currentCount + 1
      : Math.max(currentCount - 1, 0);
    setFollowersCount(newCount);

    try {
      // Вызываем API для подписки/отписки
      if (previousFollowingState) {
        await unfollowUser(displayUsername);
      } else {
        await followUser(displayUsername);
      }

      // Перезагружаем данные профиля после успешного API вызова
      // чтобы получить актуальные данные, включая followingCount просматриваемого пользователя
      const profileData = await getProfileByUsername(username);
      if (profileData) {
        setProfileState(profileData);
        setFollowersCount(profileData.followersCount ?? null);
        // Используем isFollowing из API, если оно есть, иначе используем новое состояние
        setIsFollowing(
          profileData.isFollowing !== undefined
            ? profileData.isFollowing
            : newFollowingState
        );
      } else {
        // Если данные не загрузились, оставляем оптимистичное обновление
        setIsFollowing(newFollowingState);
      }

      // Также обновляем данные текущего пользователя, чтобы обновить его followingCount
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (error) {
      // Откатываем изменения при ошибке
      console.error("Failed to follow/unfollow:", error);
      setFollowersCount(previousFollowersCount);
      setIsFollowing(previousFollowingState);
      alert(error?.response?.data?.message || "Failed to follow/unfollow user");
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handlePostClick = (index) => {
    setSelectedPostIndex(index);
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPostIndex(null);
  };

  const chatUser = useMemo(
    () => ({
      id: profile?._id || 1,
      username: displayUsername,
      avatar: avatarSrc,
    }),
    [profile, displayUsername, avatarSrc]
  );

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

  const displayPosts =
    posts.length > 0
      ? posts
      : staticPosts.map((img, idx) => ({ image: img, _id: `static_${idx}` }));

  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <header className={styles.topBar}>
          <button
            type="button"
            className={styles.topBarIcon}
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className={styles.topBarUsername}>
            <span>{displayUsername}</span>
          </div>
          <div className={styles.topBarRight} />
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarWrapper}>
                  <img src={ringRainbow} alt="" className={styles.ringRainbow} />
                  <img src={avatarSrc} alt={displayUsername} className={styles.avatar} />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.username}>{displayUsername}</h2>
                <div className={styles.stats}>
                  <div className={styles.statItem}><strong>{postsCount}</strong> posts</div>
                  <div className={styles.statItem}><strong>{displayFollowersCount}</strong> followers</div>
                  <div className={styles.statItem}><strong>{followingCount}</strong> following</div>
                </div>
                {fullName && <p className={styles.fullName}>{fullName}</p>}
                <div className={styles.bioSection}>
                  <div className={styles.bio}>
                    {bioLines.length > 0 ? (
                      isExpanded ? (
                        <>
                          {bioLines.map((line, index) => <p key={index}>{line}</p>)}
                          <button type="button" className={styles.moreButton} onClick={() => setIsExpanded(false)}>less</button>
                        </>
                      ) : (
                        <>
                          {bioLines.slice(0, 3).map((line, index) => <p key={index}>{line}</p>)}
                          {bioLines.length > 3 && (
                            <>
                              {" ... "}
                              <button type="button" className={styles.moreButton} onClick={() => setIsExpanded(true)}>more</button>
                            </>
                          )}
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
                  {!website && (
                    <div className={styles.linkContainer}>
                      <img src={linkIcon} alt="" className={styles.linkIcon} />
                      <a href="https://bit.ly/3rpiIbh" className={styles.externalLink}>bit.ly/3rpiIbh</a>
                    </div>
                  )}
                </div>
                <div className={styles.profileActions}>
                  <button type="button" className={styles.followButton} onClick={handleToggleFollow}>
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                  <button type="button" className={styles.messageButton} onClick={handleOpenChat}>
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.storySection}>
              <div className={styles.storyNew}>
                <span className={styles.storyNewIcon}><img src={createIcon} alt="" /></span>
                <span className={styles.storyNewLabel}>New</span>
              </div>
            </div>

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
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        chat={chatUser}
        fullScreenOverlay={true}
      />
      <MyPostModal
        isOpen={isPostModalOpen}
        onClose={handleClosePostModal}
        postIndex={selectedPostIndex}
        posts={displayPosts}
        username={displayUsername}
        avatar={avatarSrc}
        isFollowing={isFollowing}
        onFollow={async (newFollowingState) => {
          const previousFollowingState = isFollowing;
          const previousFollowersCount = followersCount;

          // Оптимистичное обновление - обновляем моментально
          setIsFollowing(newFollowingState);

          // Вычисляем новое значение счетчика на основе текущего отображаемого значения
          // Используем displayFollowersCount для моментального обновления
          const currentCount = displayFollowersCount;
          const newCount = newFollowingState
            ? currentCount + 1
            : Math.max(currentCount - 1, 0);
          setFollowersCount(newCount);

          try {
            if (newFollowingState) {
              await followUser(displayUsername);
            } else {
              await unfollowUser(displayUsername);
            }

            // Перезагружаем данные профиля после успешного API вызова
            const profileData = await getProfileByUsername(username);
            if (profileData) {
              setProfileState(profileData);
              setFollowersCount(profileData.followersCount ?? null);
              // Используем isFollowing из API, если оно есть, иначе используем новое состояние
              setIsFollowing(
                profileData.isFollowing !== undefined
                  ? profileData.isFollowing
                  : newFollowingState
              );
            } else {
              // Если данные не загрузились, оставляем оптимистичное обновление
              setIsFollowing(newFollowingState);
            }

            // Обновляем данные текущего пользователя
            window.dispatchEvent(new Event("profileUpdated"));
          } catch (error) {
            // Откатываем изменения при ошибке
            console.error("Failed to follow/unfollow:", error);
            setIsFollowing(previousFollowingState);
            setFollowersCount(previousFollowersCount);
            throw error; // Пробрасываем ошибку для обработки в компоненте
          }
        }}
        isOwnPost={false}
      />
    </>
  );
};

export default OtherProfilePage;
