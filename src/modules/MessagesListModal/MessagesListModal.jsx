import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./MessagesListModal.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { selectUser } from "../../store/auth/authSelectors";

const MessagesListModal = ({ isOpen, onClose, onSelectChat, selectedChatId }) => {
  const currentUser = useSelector(selectUser);
  const [chats, setChats] = useState([]);
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

  const navigate = useNavigate();

  // Загружаем переписки из localStorage
  useEffect(() => {
    if (isOpen && currentUser?._id) {
      const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
      if (storedChats) {
        try {
          const parsedChats = JSON.parse(storedChats);
          // Сортируем по времени последнего сообщения (новые сверху)
          const sortedChats = parsedChats.sort((a, b) => {
            const timeA = new Date(a.lastMessageTime || 0).getTime();
            const timeB = new Date(b.lastMessageTime || 0).getTime();
            return timeB - timeA;
          });
          setChats(sortedChats);
        } catch (error) {
          console.error("Failed to parse stored chats:", error);
          setChats([]);
        }
      } else {
        setChats([]);
      }
    }
  }, [isOpen, currentUser?._id]);

  // Слушаем события обновления переписок
  useEffect(() => {
    const handleChatsUpdated = () => {
      if (currentUser?._id) {
        const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
        if (storedChats) {
          try {
            const parsedChats = JSON.parse(storedChats);
            const sortedChats = parsedChats.sort((a, b) => {
              const timeA = new Date(a.lastMessageTime || 0).getTime();
              const timeB = new Date(b.lastMessageTime || 0).getTime();
              return timeB - timeA;
            });
            setChats(sortedChats);
          } catch (error) {
            console.error("Failed to parse stored chats:", error);
          }
        }
      }
    };

    window.addEventListener("chatsUpdated", handleChatsUpdated);
    return () => {
      window.removeEventListener("chatsUpdated", handleChatsUpdated);
    };
  }, [currentUser?._id]);

  // Форматируем время для отображения
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  const handleChatClick = (chat) => {
    if (onSelectChat) {
      onSelectChat(chat);
    }
  };

  const handleOpenProfile = (event, username) => {
    event.stopPropagation();
    navigate(`/other-profile/${username}`);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2 className={styles.title}>itcareerhub</h2>
        <div className={styles.chatsList}>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <button
                key={chat.id || chat.username}
                onClick={() => handleChatClick(chat)}
                className={`${styles.chatItem} ${
                  selectedChatId === chat.id ? styles.active : ""
                }`}
              >
                <img
                  src={chat.avatar || profileLogo}
                  alt={chat.username}
                  className={styles.avatar}
                  onClick={(event) => handleOpenProfile(event, chat.username)}
                />
                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <span
                      className={styles.username}
                      onClick={(event) => handleOpenProfile(event, chat.username)}
                    >
                      {chat.username}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.time}>
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <div className={styles.lastMessage}>
                    {chat.lastMessage || "No messages yet"}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className={styles.noChats}>No conversations yet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesListModal;

