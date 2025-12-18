import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import styles from "./MyProfileEdit.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import borderIcon from "../../assets/icons/Border.svg";
import { logoutUser, getCurrentUser } from "../../store/auth/authOperations";
import { persistor } from "../../store/store";
import { updateProfile, getProfile } from "../../shared/api/users-api";
import { selectUser } from "../../store/auth/authSelectors";

const MyProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [website, setWebsite] = useState(currentUser?.website || "");
  const [about, setAbout] = useState(currentUser?.bio || "");
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser?.avatar || null,
  );
  const maxAboutLength = 150;
  const aboutLength = about.length;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setUsername(profile.username || "");
        setWebsite(profile.website || "");
        setAbout(profile.bio || "");
        setAvatarPreview(profile.avatar || null);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {};
      if (username && username !== currentUser?.username) {
        updateData.username = username;
      }
      if (website !== currentUser?.website) {
        updateData.website = website || "";
      }
      if (about !== currentUser?.bio) {
        updateData.bio = about;
      }
      if (avatarPreview && avatarPreview !== currentUser?.avatar) {
        updateData.avatar = avatarPreview;
      }

      if (Object.keys(updateData).length > 0) {
        await updateProfile(updateData);
        // Обновляем данные пользователя в Redux через getCurrentUser
        await dispatch(getCurrentUser()).unwrap();
      }
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await persistor.purge();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      await persistor.purge();
      navigate("/");
    }
  };

  const handleNewPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setAvatarPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div className={styles.container}>
            <h1 className={styles.title}>Edit profile</h1>

            <div className={styles.profileSection}>
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
                  <img
                    src={borderIcon}
                    alt="Border"
                    className={styles.border}
                  />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{username || "username"}</h2>
                <p className={styles.profileBio}>
                  {about.split("\n")[0] || "No bio"}
                </p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                className={styles.newPhotoButton}
                onClick={handleNewPhotoClick}
              >
                New photo
              </button>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Username</label>
                <input
                  type="text"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Website</label>
                <div className={styles.websiteInputContainer}>
                  <img
                    src={linkIcon}
                    alt="Link icon"
                    className={styles.linkIcon}
                  />
                  <input
                    type="text"
                    className={styles.websiteInput}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>About</label>
                <div className={styles.textareaContainer}>
                  <textarea
                    className={styles.textarea}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    maxLength={maxAboutLength}
                    rows={4}
                  />
                  <div className={styles.charCount}>
                    {aboutLength} / {maxAboutLength}
                  </div>
                </div>
              </div>
              <div className={styles.buttonDiv}>
                <button
                  className={styles.saveButton}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfileEdit;
