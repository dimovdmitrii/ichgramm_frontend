import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CreatePostModal.module.css";
import uploadIcon from "../../assets/icons/posts_icons/upload.svg";
import borderIcon from "../../assets/icons/Border.svg";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { selectUser } from "../../store/auth/authSelectors";
import { createPost, updatePost, getProfile } from "../../shared/api/users-api";

const CreatePostModal = ({ isOpen, onClose, editPost, onSave }) => {
  const user = useSelector(selectUser);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const maxDescriptionLength = 500; // Бэкенд ограничивает content до 500 символов
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

  // Загружаем аватар текущего пользователя
  useEffect(() => {
    const loadAvatar = async () => {
      // Сначала пробуем из Redux store
      if (user?.avatar) {
        setAvatarPreview(user.avatar);
        return;
      }
      
      // Если нет в Redux, загружаем из API
      try {
        const profile = await getProfile();
        if (profile?.avatar) {
          setAvatarPreview(profile.avatar);
        }
      } catch (error) {
        console.error("Failed to load profile avatar:", error);
      }
    };
    
    if (isOpen) {
      loadAvatar();
    }
  }, [user, isOpen]);

  // Загружаем данные поста для редактирования
  useEffect(() => {
    if (editPost) {
      setSelectedImage(editPost.image);
      // Бэкенд использует поле content, но поддерживаем и description для обратной совместимости
      setDescription(editPost.content || editPost.description || "");
      setSelectedFile(null); // При редактировании файл может быть не выбран
    } else {
      setSelectedImage(null);
      setDescription("");
      setSelectedFile(null);
    }
  }, [editPost, isOpen]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Функция для сжатия изображения
  const compressImage = (file, maxWidth = 1280, maxHeight = 1280, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Вычисляем новые размеры с сохранением пропорций
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            file.type,
            quality
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      try {
        // Сжимаем изображение перед сохранением
        const compressedFile = await compressImage(file);
        setSelectedFile(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Failed to compress image:", error);
        // Если сжатие не удалось, используем оригинальный файл
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleShare = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      
      if (isEditMode && editPost?._id) {
        // Редактируем существующий пост
        const updateData = {};
        
        if (selectedFile) {
          // Конвертируем файл в base64 строку
          const base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
          });
          updateData.image = base64Image;
        }
        
        if (description.trim()) {
          updateData.content = description.trim();
        }

        await updatePost(editPost._id, updateData);
      } else {
        // Создаем новый пост
        if (!selectedFile) {
          alert("Please select an image file");
          setIsLoading(false);
          return;
        }

        // Бэкенд ожидает image как строку (base64 или URL), а не файл
        // Конвертируем файл в base64 строку
        let base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        // Проверяем размер base64 строки (примерно 1.33x от размера файла)
        // Если больше 500KB, сжимаем еще больше
        const maxBase64Size = 500 * 1024; // 500KB в символах
        if (base64Image.length > maxBase64Size) {
          console.log("Image too large, compressing further...", {
            originalSize: base64Image.length,
            fileSize: selectedFile.size,
          });
          
          // Сжимаем с более низким качеством и меньшим размером
          const compressedBlob = await compressImage(selectedFile, 1024, 1024, 0.5);
          base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(compressedBlob);
          });
          
          console.log("After compression:", {
            newSize: base64Image.length,
            blobSize: compressedBlob.size,
          });
          
          // Если все еще слишком большое, сжимаем еще сильнее
          if (base64Image.length > maxBase64Size) {
            const finalCompressedBlob = await compressImage(selectedFile, 800, 800, 0.4);
            base64Image = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(finalCompressedBlob);
            });
            console.log("Final compression:", {
              finalSize: base64Image.length,
              finalBlobSize: finalCompressedBlob.size,
            });
          }
        }

        // Бэкенд ожидает объект с полями image (строка) и content (строка, минимум 1 символ)
        // Если описание пустое, используем пробел или дефолтное значение
        const content = description.trim() || " ";

        const postData = {
          image: base64Image,
          content: content,
        };

        console.log("Creating post with data:", {
          hasImage: !!base64Image,
          imageLength: base64Image?.length || 0,
          imageSizeKB: Math.round((base64Image?.length || 0) / 1024),
          content: postData.content || "(empty)",
          contentLength: postData.content.length,
        });

        await createPost(postData);
      }

      // Отправляем событие для обновления страницы профиля
      window.dispatchEvent(new Event("postsUpdated"));

      // Вызываем callback для сохранения (перезагрузка постов)
      if (onSave) {
        onSave();
      }

      // Очищаем форму и закрываем модальное окно
      setSelectedImage(null);
      setSelectedFile(null);
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Failed to save post:", error);
      console.error("Error response:", error?.response);
      console.error("Error response data:", error?.response?.data);
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Failed to save post. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            disabled={!selectedImage || isLoading}
          >
            {isLoading ? "Saving..." : isEditMode ? "Save" : "Share"}
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
