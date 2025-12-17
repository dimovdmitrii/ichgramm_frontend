import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import ChatModal from "../../modules/ChatModal/ChatModal";
import OtherPostModal from "../../modules/OtherPostModal/OtherPostModal";

import styles from "./OtherProfilePage.module.css";

import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import profile1 from "../../assets/Images/UsersProfile/Profile_Post1.png";
import profile2 from "../../assets/Images/UsersProfile/Profile_Post2.png";
import profile3 from "../../assets/Images/UsersProfile/Profile_Post3.png";
import profile4 from "../../assets/Images/UsersProfile/Profile_Post4.png";
import profile5 from "../../assets/Images/UsersProfile/Profile_Post5.png";
import profile6 from "../../assets/Images/UsersProfile/Profile_Post6.png";
import nikitaAvatar from "../../assets/Images/nikita.jpg";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";

const OtherProfilePage = () => {
  const { username: routeUsername } = useParams();
  const username = routeUsername || "user";

  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const avatarSrc = useMemo(() => {
    if (username === "nikiita") return nikitaAvatar;
    if (username === "sashaa") return sashaaAvatar;
    return profileLogo;
  }, [username]);

  const staticPosts = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
  ];

  const fullBio = "БЕСПЛАТНЫЙ ПОДБОР ПРОФЕССИИ С НУЛЯ";
  const shortBio = "БЕСПЛАТНЫЙ";

  useEffect(() => {
    const savedFollowers = localStorage.getItem(
      `otherProfile_followers_${username}`
    );
    const savedIsFollowing = localStorage.getItem(
      `otherProfile_isFollowing_${username}`
    );

    setFollowersCount(savedFollowers ? Number(savedFollowers) || 0 : 0);
    setIsFollowing(savedIsFollowing === "true");
  }, [username]);

  const handleToggleFollow = () => {
    setFollowersCount((prev) => {
      const next = isFollowing ? Math.max(prev - 1, 0) : prev + 1;
      localStorage.setItem(`otherProfile_followers_${username}`, String(next));
      return next;
    });

    setIsFollowing((prev) => {
      const next = !prev;
      localStorage.setItem(
        `otherProfile_isFollowing_${username}`,
        String(next)
      );
      return next;
    });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
  };

  const chatUser = useMemo(
    () => ({
      id: 1,
      username,
      avatar: avatarSrc,
    }),
    [username, avatarSrc]
  );

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
                    src={avatarSrc}
                    alt={username}
                    className={styles.avatar}
                  />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.usernameSection}>
                  <h2 className={styles.username}>{username}</h2>
                  <button
                    className={styles.followButton}
                    onClick={handleToggleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button
                    className={styles.messageButton}
                    onClick={handleOpenChat}
                  >
                    Message
                  </button>
                </div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span>{staticPosts.length} posts</span>
                  </div>
                  <div className={styles.statItem}>
                    <span>{followersCount} followers</span>
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
              {staticPosts.map((post, index) => (
                <div
                  key={index}
                  className={styles.postItem}
                  onClick={() => handlePostClick(post)}
                >
                  <img
                    src={post}
                    alt={`Post ${index + 1}`}
                    className={styles.postImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        chat={chatUser}
      />
      <OtherPostModal
        isOpen={isPostModalOpen}
        onClose={handleClosePostModal}
        post={selectedPost}
        username={username}
      />
    </>
  );
};

export default OtherProfilePage;
