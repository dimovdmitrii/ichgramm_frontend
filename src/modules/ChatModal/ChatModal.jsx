import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatModal.module.css";
import logoSmall from "../../assets/icons/MyProfile_Logo.svg";
import profileLogo from "../../assets/icons/MyProfile_Logo.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSelectors";
import { store } from "../../store/store";

const ChatModal = ({ isOpen, onClose, chat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !chat) {
      return;
    }

    // Сохраняем переписку в localStorage при открытии
    if (currentUser?._id) {
      try {
        const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
        const chats = storedChats ? JSON.parse(storedChats) : [];
        const chatIndex = chats.findIndex((c) => c.username === chat.username);
        
        if (chatIndex === -1) {
          // Ограничиваем количество переписок до 50, удаляем самые старые
          if (chats.length >= 50) {
            chats.sort((a, b) => {
              const timeA = new Date(a.lastMessageTime || 0).getTime();
              const timeB = new Date(b.lastMessageTime || 0).getTime();
              return timeB - timeA;
            });
            chats.splice(50);
          }
          
          // Добавляем новую переписку, если её еще нет (только минимальные данные)
          chats.push({
            id: chats.length + 1,
            username: chat.username,
            // Сохраняем avatar только если это URL, не base64
            avatar: chat.avatar && !chat.avatar.startsWith('data:') ? chat.avatar : null,
            lastMessage: "",
            lastMessageTime: new Date().toISOString(),
          });
          
          const chatsString = JSON.stringify(chats);
          // Уменьшили лимит до 100KB для переписок
          if (chatsString.length < 100 * 1024) {
            localStorage.setItem(`chats_${currentUser._id}`, chatsString);
            window.dispatchEvent(new Event("chatsUpdated"));
          } else {
            console.warn("Chats data too large, skipping save");
            // Если данные слишком большие, удаляем самые старые переписки
            if (chats.length > 10) {
              chats.sort((a, b) => {
                const timeA = new Date(a.lastMessageTime || 0).getTime();
                const timeB = new Date(b.lastMessageTime || 0).getTime();
                return timeB - timeA;
              });
              const reduced = chats.slice(0, 10);
              const reducedString = JSON.stringify(reduced);
              if (reducedString.length < 100 * 1024) {
                localStorage.setItem(`chats_${currentUser._id}`, reducedString);
                window.dispatchEvent(new Event("chatsUpdated"));
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to save chat to localStorage:", error);
      }
    }

    // Используем токен из Redux store вместо localStorage
    const state = store.getState();
    const token = state?.auth?.accessToken;
    const baseUrl = import.meta.env.VITE_WS_URL || "ws://localhost:3000/ws/chat";
    const WS_URL = token
      ? `${baseUrl}?token=${encodeURIComponent(token)}`
      : baseUrl;

    const socket = new WebSocket(WS_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "load",
          with: chat.username,
        }),
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "history" && Array.isArray(data.messages)) {
          const formattedMessages = data.messages.map((m) => {
            const isIncoming = m.from === chat.username;
            return {
              id: m.id || m._id || Date.now(),
              isIncoming,
              text: m.text,
              avatar: isIncoming
                ? m.fromAvatar || chat.avatar || profileLogo
                : currentUser?.avatar || logoSmall,
              createdAt: m.createdAt,
            };
          });
          setMessages(formattedMessages);
          
          // Обновляем последнее сообщение в списке переписок
          if (formattedMessages.length > 0 && currentUser?._id) {
            try {
              const lastMessage = formattedMessages[formattedMessages.length - 1];
              const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
              const chats = storedChats ? JSON.parse(storedChats) : [];
              const chatIndex = chats.findIndex((c) => c.username === chat.username);
              
              if (chatIndex !== -1) {
                const messageText = lastMessage.text.length > 30 
                  ? lastMessage.text.substring(0, 30) + "..." 
                  : lastMessage.text;
                chats[chatIndex] = {
                  ...chats[chatIndex],
                  lastMessage: messageText,
                  lastMessageTime: lastMessage.createdAt || new Date().toISOString(),
                };
                const chatsString = JSON.stringify(chats);
                // Уменьшили лимит до 100KB для переписок
                if (chatsString.length < 100 * 1024) {
                  localStorage.setItem(`chats_${currentUser._id}`, chatsString);
                  window.dispatchEvent(new Event("chatsUpdated"));
                } else {
                  console.warn("Chats data too large, skipping save");
                }
              }
            } catch (error) {
              console.error("Failed to update chat in localStorage:", error);
            }
          }
        } else if (data.type === "message") {
          setMessages((prev) => {
            // Если это наше сообщение, которое мы уже добавили оптимистично, обновляем его
            const existingIndex = prev.findIndex(
              (m) => m.isPending && !m.isIncoming && m.text === data.text
            );
            
            if (existingIndex !== -1) {
              // Заменяем временное сообщение на подтвержденное
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                id: data.id || Date.now(),
                isPending: false,
                createdAt: data.createdAt,
              };
              return updated;
            }
            
            // Если это входящее сообщение, добавляем его
            return [
              ...prev,
              {
                id: data.id || Date.now(),
                isIncoming: data.from === chat.username,
                text: data.text,
                avatar: data.from === chat.username
                  ? data.fromAvatar || chat.avatar || profileLogo
                  : currentUser?.avatar || logoSmall,
                createdAt: data.createdAt,
              },
            ];
          });
          
          // Обновляем список переписок в localStorage
          if (currentUser?._id) {
            try {
              const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
              const chats = storedChats ? JSON.parse(storedChats) : [];
              const chatIndex = chats.findIndex((c) => c.username === chat.username);
              const messageText = data.text.length > 30 
                ? data.text.substring(0, 30) + "..." 
                : data.text;
              const chatData = {
                id: chat.id || chatIndex + 1,
                username: chat.username,
                // Сохраняем avatar только если это URL, не base64
                avatar: chat.avatar && !chat.avatar.startsWith('data:') ? chat.avatar : null,
                lastMessage: messageText,
                lastMessageTime: data.createdAt || new Date().toISOString(),
              };
              
              if (chatIndex !== -1) {
                chats[chatIndex] = chatData;
              } else {
                // Ограничиваем количество переписок до 20 (уменьшили с 50)
                if (chats.length >= 20) {
                  chats.sort((a, b) => {
                    const timeA = new Date(a.lastMessageTime || 0).getTime();
                    const timeB = new Date(b.lastMessageTime || 0).getTime();
                    return timeB - timeA;
                  });
                  chats.splice(20);
                }
                chats.push(chatData);
              }
              
                const chatsString = JSON.stringify(chats);
                // Уменьшили лимит до 100KB для переписок
                if (chatsString.length < 100 * 1024) {
                  localStorage.setItem(`chats_${currentUser._id}`, chatsString);
                  window.dispatchEvent(new Event("chatsUpdated"));
                } else {
                  console.warn("Chats data too large, skipping save");
                  // Если данные слишком большие, удаляем самые старые переписки
                  if (chats.length > 10) {
                    chats.sort((a, b) => {
                      const timeA = new Date(a.lastMessageTime || 0).getTime();
                      const timeB = new Date(b.lastMessageTime || 0).getTime();
                      return timeB - timeA;
                    });
                    const reduced = chats.slice(0, 10);
                    const reducedString = JSON.stringify(reduced);
                    if (reducedString.length < 100 * 1024) {
                      localStorage.setItem(`chats_${currentUser._id}`, reducedString);
                      window.dispatchEvent(new Event("chatsUpdated"));
                    }
                  }
                }
            } catch (error) {
              console.error("Failed to save chat to localStorage:", error);
            }
          }
        }
      } catch {
        // ignore malformed messages
      }
    };

    socket.onerror = () => {};

    socket.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      socket.close();
      wsRef.current = null;
      setMessages([]);
    };
  }, [isOpen, chat, currentUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen || !chat) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageText = message.trim();
      const tempId = Date.now();
      
      // Оптимистичное обновление - сразу показываем сообщение
      setMessages((prev) => [
        ...prev,
        {
          id: tempId,
          isIncoming: false,
          text: messageText,
          avatar: currentUser?.avatar || logoSmall,
          createdAt: new Date().toISOString(),
          isPending: true, // Помечаем как ожидающее подтверждение
        },
      ]);
      
      setMessage("");
      
          // Обновляем список переписок в localStorage
          if (currentUser?._id) {
            try {
              const storedChats = localStorage.getItem(`chats_${currentUser._id}`);
              const chats = storedChats ? JSON.parse(storedChats) : [];
              const chatIndex = chats.findIndex((c) => c.username === chat.username);
              // Сохраняем только минимальные данные для переписок
              const chatData = {
                id: chat.id || chatIndex + 1,
                username: chat.username,
                // Сохраняем avatar только если это URL, не base64
                avatar: chat.avatar && !chat.avatar.startsWith('data:') ? chat.avatar : null,
                lastMessage: messageText.length > 30 ? messageText.substring(0, 30) + "..." : messageText,
                lastMessageTime: new Date().toISOString(),
              };
              
              if (chatIndex !== -1) {
                chats[chatIndex] = chatData;
              } else {
                // Ограничиваем количество переписок до 20 (уменьшили с 50)
                if (chats.length >= 20) {
                  chats.sort((a, b) => {
                    const timeA = new Date(a.lastMessageTime || 0).getTime();
                    const timeB = new Date(b.lastMessageTime || 0).getTime();
                    return timeB - timeA;
                  });
                  chats.splice(20);
                }
                chats.push(chatData);
              }
              
              const chatsString = JSON.stringify(chats);
              // Уменьшили лимит до 100KB для переписок
              if (chatsString.length < 100 * 1024) {
                localStorage.setItem(`chats_${currentUser._id}`, chatsString);
                window.dispatchEvent(new Event("chatsUpdated"));
              } else {
                console.warn("Chats data too large, skipping save");
                // Если данные слишком большие, удаляем самые старые переписки
                if (chats.length > 10) {
                  chats.sort((a, b) => {
                    const timeA = new Date(a.lastMessageTime || 0).getTime();
                    const timeB = new Date(b.lastMessageTime || 0).getTime();
                    return timeB - timeA;
                  });
                  const reduced = chats.slice(0, 10);
                  const reducedString = JSON.stringify(reduced);
                  if (reducedString.length < 100 * 1024) {
                    localStorage.setItem(`chats_${currentUser._id}`, reducedString);
                    window.dispatchEvent(new Event("chatsUpdated"));
                  }
                }
              }
            } catch (error) {
              console.error("Failed to save chat to localStorage:", error);
              // Если ошибка QuotaExceededError, очищаем старые данные
              if (error.name === 'QuotaExceededError') {
                try {
                  localStorage.removeItem(`chats_${currentUser._id}`);
                  console.log("Cleared old chats due to quota exceeded");
                } catch (clearError) {
                  console.error("Failed to clear chats:", clearError);
                }
              }
            }
          }
      
      // Отправляем через WebSocket
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "message",
            to: chat.username,
            text: messageText,
          }),
        );
      }
    }
  };

  const handleViewProfile = () => {
    navigate(`/other-profile/${chat.username}`);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.chatHeader}>
          <img
            src={chat.avatar || profileLogo}
            alt={chat.username}
            className={styles.headerAvatar}
          />
          <span className={styles.headerUsername}>{chat.username}</span>
        </div>
        <div className={styles.chatContent}>
          <div className={styles.userProfile}>
            <img
              src={chat.avatar || profileLogo}
              alt={chat.username}
              className={styles.profileAvatar}
            />
            <h3 className={styles.profileName}>{chat.username}</h3>
            <p className={styles.profileUsername}>{chat.username} · ICHgram</p>
            <button
              className={styles.viewProfileButton}
              type="button"
              onClick={handleViewProfile}
            >
              View profile
            </button>
          </div>
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.isIncoming ? styles.incoming : styles.outgoing
                }`}
              >
                {msg.isIncoming && (
                  <img
                    src={msg.avatar || profileLogo}
                    alt="User"
                    className={styles.messageAvatar}
                  />
                )}
                <div
                  className={`${styles.messageBubble} ${
                    msg.isIncoming
                      ? styles.incomingBubble
                      : styles.outgoingBubble
                  }`}
                >
                  {msg.text}
                </div>
                {!msg.isIncoming && (
                  <img
                    src={msg.avatar || logoSmall}
                    alt="ICH"
                    className={styles.messageIcon}
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form className={styles.messageInputContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageInput}
          />
        </form>
      </div>
    </>
  );
};

export default ChatModal;
