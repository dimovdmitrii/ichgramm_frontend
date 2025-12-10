import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CreatePostModal.module.css";
import uploadIcon from "../../assets/icons/posts_icons/upload.svg";
import borderIcon from "../../assets/icons/Border.svg";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { selectUser } from "../../store/auth/authSelectors";

const CreatePostModal = ({ isOpen, onClose, editPost, onSave }) => {
  const user = useSelector(selectUser);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const maxDescriptionLength = 2200;
  const isEditMode = !!editPost;

  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию прокрутки
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Восстанавливаем позицию прокрутки
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
      // Очищаем форму при закрытии
      setSelectedImage(null);
      setDescription("");
    }
    return () => {
      // Очистка при размонтировании
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

  // Загружаем аватар из localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }
  }, []);

  // Загружаем данные поста для редактирования
  useEffect(() => {
    if (editPost) {
      setSelectedImage(editPost.image);
      setDescription(editPost.description || "");
    } else {
      setSelectedImage(null);
      setDescription("");
    }
  }, [editPost, isOpen]);

  const handleUploadClick = () => {
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
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (!selectedImage) return;

    // Получаем существующие посты из localStorage
    const existingPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");

    if (isEditMode && editPost?.id) {
      // Редактируем существующий пост
      const updatedPosts = existingPosts.map((post) =>
        post.id === editPost.id
          ? {
              ...post,
              image: selectedImage,
              description: description.trim() || "",
            }
          : post
      );

      // Сохраняем в localStorage
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));

      // Отправляем событие для обновления страницы профиля
      window.dispatchEvent(new Event("postsUpdated"));

      // Вызываем callback для сохранения
      if (onSave) {
        onSave();
      }
    } else {
      // Создаем новый пост
      const newPost = {
        id: Date.now(), // Уникальный ID на основе времени
        image: selectedImage,
        description: description.trim() || "",
        createdAt: new Date().toISOString(),
      };

      // Добавляем новый пост в начало массива
      const updatedPosts = [newPost, ...existingPosts];

      // Сохраняем в localStorage
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));

      // Отправляем событие для обновления страницы профиля
      window.dispatchEvent(new Event("postsUpdated"));
    }

    // Очищаем форму и закрываем модальное окно
    setSelectedImage(null);
    setDescription("");
    onClose();
  };

  const username = user?.username || "itcareerhub";

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditMode ? "Edit post" : "Create new post"}
          </h2>
          <button
            className={styles.shareButton}
            onClick={handleShare}
            disabled={!selectedImage}
          >
            {isEditMode ? "Save" : "Share"}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.leftSection}>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {selectedImage ? (
              <div className={styles.imagePreview}>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className={styles.previewImage}
                />
                <button
                  className={styles.changeImageButton}
                  onClick={handleUploadClick}
                >
                  Change photo
                </button>
              </div>
            ) : (
              <div className={styles.uploadArea} onClick={handleUploadClick}>
                <img
                  src={uploadIcon}
                  alt="Upload"
                  className={styles.uploadIcon}
                />
              </div>
            )}
          </div>

          <div className={styles.rightSection}>
            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                <img src={borderIcon} alt="Border" className={styles.border} />
                <img
                  src={avatarPreview || profileLogo}
                  alt="Profile"
                  className={styles.avatar}
                />
              </div>
              <span className={styles.username}>{username}</span>
            </div>

            <div className={styles.descriptionSection}>
              <textarea
                className={styles.descriptionInput}
                placeholder="Write a caption..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={maxDescriptionLength}
                rows={10}
              />
              <div className={styles.charCount}>
                {description.length} / {maxDescriptionLength}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
