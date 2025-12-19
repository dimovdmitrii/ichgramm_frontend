import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MessagesListModal.module.css";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { selectUser } from "../../store/auth/authSelectors";
import { getChats } from "../../shared/api/users-api";

const MessagesListModal = ({
  isOpen,
  onClose,
  onSelectChat,
  selectedChatId,
  hasOpenChat = false, // Флаг, указывающий, открыт ли чат
}) => {
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

  // Загружаем переписки из API и localStorage
  useEffect(() => {
    const loadChats = async () => {
      if (isOpen && currentUser?._id) {
        try {
          // Загружаем чаты из API
          const apiChats = await getChats();

          // Преобразуем формат API в формат компонента
          const formattedChats = apiChats.map((chat) => ({
            id: chat.userId,
            username: chat.username,
            avatar: chat.avatar || null,
            lastMessage: chat.lastMessage || "",
            lastMessageTime: chat.lastMessageTime || new Date().toISOString(),
          }));

          // Объединяем с данными из localStorage (для обратной совместимости)
          const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
          if (storedChats) {
            try {
              const parsedChats = JSON.parse(storedChats);
              // Создаем Map для быстрого поиска
              const apiChatsMap = new Map(
                formattedChats.map((c) => [c.username, c])
              );

              // Объединяем: приоритет у API данных, но сохраняем локальные если их нет в API
              parsedChats.forEach((localChat) => {
                if (!apiChatsMap.has(localChat.username)) {
                  formattedChats.push(localChat);
                }
              });
            } catch (error) {
              console.error("Failed to parse stored chats:", error);
            }
          }

          // Сортируем по времени последнего сообщения (новые сверху)
          const sortedChats = formattedChats.sort((a, b) => {
            const timeA = new Date(a.lastMessageTime || 0).getTime();
            const timeB = new Date(b.lastMessageTime || 0).getTime();
            return timeB - timeA;
          });

          setChats(sortedChats);
        } catch (error) {
          console.error("Failed to load chats from API:", error);
          // Fallback на localStorage
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
            } catch (parseError) {
              console.error("Failed to parse stored chats:", parseError);
              setChats([]);
            }
          } else {
            setChats([]);
          }
        }
      }
    };

    loadChats();
  }, [isOpen, currentUser?._id]);

  // Слушаем события обновления переписок
  useEffect(() => {
    const handleChatsUpdated = async () => {
      if (currentUser?._id) {
        try {
          // Загружаем актуальные данные из API
          const apiChats = await getChats();
          const formattedChats = apiChats.map((chat) => ({
            id: chat.userId,
            username: chat.username,
            avatar: chat.avatar || null,
            lastMessage: chat.lastMessage || "",
            lastMessageTime: chat.lastMessageTime || new Date().toISOString(),
          }));

          // Объединяем с localStorage
          const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
          if (storedChats) {
            try {
              const parsedChats = JSON.parse(storedChats);
              const apiChatsMap = new Map(
                formattedChats.map((c) => [c.username, c])
              );
              parsedChats.forEach((localChat) => {
                if (!apiChatsMap.has(localChat.username)) {
                  formattedChats.push(localChat);
                }
              });
            } catch (error) {
              console.error("Failed to parse stored chats:", error);
            }
          }

          const sortedChats = formattedChats.sort((a, b) => {
            const timeA = new Date(a.lastMessageTime || 0).getTime();
            const timeB = new Date(b.lastMessageTime || 0).getTime();
            return timeB - timeA;
          });
          setChats(sortedChats);
        } catch (error) {
          console.error("Failed to reload chats from API:", error);
          // Fallback на localStorage
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
            } catch (parseError) {
              console.error("Failed to parse stored chats:", parseError);
            }
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

  const handleOverlayClick = (e) => {
    // Если открыт чат, не закрываем модальное окно при клике на overlay
    if (hasOpenChat) {
      return;
    }
    // Предотвращаем закрытие, если клик был на самом overlay, а не на модальном окне
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
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
                  onError={(e) => {
                    e.target.src = profileLogo;
                  }}
                />
                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <span className={styles.username}>{chat.username}</span>
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
