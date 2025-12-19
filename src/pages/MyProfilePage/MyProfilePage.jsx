import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import {
  getProfile,
  getUserPosts,
  deletePost,
} from "../../shared/api/users-api";
import { selectUser } from "../../store/auth/authSelectors";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [profile, setProfileState] = useState(null);
  const [posts, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Загружаем профиль
      const profileData = await getProfile();
      setProfileState(profileData);

      // Используем _id из profileData для загрузки постов
      const userId = profileData?._id || currentUser?._id;
      if (userId) {
        try {
          const postsData = await getUserPosts(userId);
          console.log("Loading posts for user:", userId);
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
      setProfileState(null);
      setPostsState([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Загружаем данные профиля независимо от currentUser
    // getProfile() использует токен из заголовков, поэтому должен работать
    loadProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id]);

  // Слушаем событие создания нового поста
  useEffect(() => {
    const handlePostCreated = () => {
      if (currentUser?._id) {
        loadProfileData();
      }
    };

    window.addEventListener("postsUpdated", handlePostCreated);
    return () => {
      window.removeEventListener("postsUpdated", handlePostCreated);
    };
  }, [currentUser?._id]);

  // Слушаем событие обновления профиля (например, при подписке/отписке)
  useEffect(() => {
    const handleProfileUpdated = () => {
      if (currentUser?._id) {
        loadProfileData();
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
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
      setPosts((prev) =>
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
      setProfile(profileData);
      setPosts(postsData || []);
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
  const bio = displayProfile?.bio || "";
  const website = displayProfile?.website || "";
  const postsCount = displayProfile?.postsCount || posts.length;
  const followersCount = displayProfile?.followersCount || 0;
  const followingCount = displayProfile?.followingCount || 0;

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
                    src={avatarUrl}
                    alt="Profile"
                    className={styles.avatar}
                  />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.usernameSection}>
                  <h2 className={styles.username}>{username}</h2>
                  <button
                    className={styles.editButton}
                    onClick={handleEditProfile}
                  >
                    Edit profile
                  </button>
                </div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span>{postsCount} posts</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>{followersCount} followers</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>{followingCount} following</span>
                  </div>
                </div>
                <div className={styles.bioSection}>
                  <div className={styles.bio}>
                    {bioLines.length > 3 ? (
                      <>
                        {isExpanded ? (
                          <>
                            {bioLines.map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                            <p>
                              <span className={styles.moreLink}>
                                {" "}
                                <button
                                  className={styles.moreButton}
                                  onClick={() => setIsExpanded(false)}
                                >
                                  less
                                </button>
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            {bioLines.slice(0, 3).map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                            <p>
                              <span className={styles.moreLink}>
                                {" ... "}
                                <button
                                  className={styles.moreButton}
                                  onClick={() => setIsExpanded(true)}
                                >
                                  more
                                </button>
                              </span>
                            </p>
                          </>
                        )}
                      </>
                    ) : (
                      bioLines.map((line, index) => <p key={index}>{line}</p>)
                    )}
                  </div>
                  {website && (
                    <div className={styles.linkContainer}>
                      <img
                        src={linkIcon}
                        alt="Link icon"
                        className={styles.linkIcon}
                      />
                      <a
                        href={
                          website.startsWith("http")
                            ? website
                            : `https://${website}`
                        }
                        className={styles.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.postsGrid}>
              {displayPosts.map((post, index) => {
                const postImage = post.image || profileLogo;
                const postKey = post._id || index;

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
              {displayPosts.length === 0 && (
                <div className={styles.noPosts}>No posts yet</div>
              )}
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
