import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../../shared/components/Footer/footer";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import styles from "./MyProfileEdit.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import ringRainbow from "../../assets/Images/ring-rainbow.png";
import linkIcon from "../../assets/icons/Link_Icon.svg";
import borderIcon from "../../assets/icons/Border.svg";
import { logoutUser } from "../../store/auth/authOperations";

const MyProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("ichschool");
  const [website, setWebsite] = useState("bit.ly/3rpiIbh");
  const [about, setAbout] = useState(
    "• Гарантия помощи с трудоустройством в ведущие IT-компании\n• Выпускники зарабатывают от 45к евро\nБЕСПЛАТНЫЙ ПОДБОР ПРОФЕССИИ С НУЛЯ"
  );
  const maxAboutLength = 150;
  const aboutLength = about.length;

  const handleSave = () => {
    // Здесь будет логика сохранения
    navigate("/my-profile");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Даже если произошла ошибка, очищаем состояние и редиректим
      navigate("/");
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
                    src={profileLogo}
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
                <h2 className={styles.profileName}>ichschool</h2>
                <p className={styles.profileBio}>
                  • Гарантия помощи с трудоустройством в ведущие IT-компании
                </p>
              </div>
              <button className={styles.newPhotoButton}>New photo</button>
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
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
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
