import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MessagesListModal.module.css";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import nikitaAvatar from "../../assets/Images/nikita.jpg";

const MessagesListModal = ({ isOpen, onClose, onSelectChat, selectedChatId }) => {
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

  if (!isOpen) return null;

  const chats = [
    {
      id: 1,
      username: "nikiita",
      lastMessage: "Nikiita sent a message.",
      time: "2 wek",
      avatar: nikitaAvatar,
    },
    {
      id: 2,
      username: "sashaa",
      lastMessage: "Sashaa sent a message.",
      time: "2 wek",
      avatar: sashaaAvatar,
    },
  ];

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
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`${styles.chatItem} ${
                selectedChatId === chat.id ? styles.active : ""
              }`}
            >
              <img
                src={chat.avatar}
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
                  <span className={styles.time}>{chat.time}</span>
                </div>
                <div className={styles.lastMessage}>{chat.lastMessage}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessagesListModal;

