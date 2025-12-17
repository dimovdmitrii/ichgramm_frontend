import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatModal.module.css";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import nikitaAvatar from "../../assets/Images/nikita.jpg";
import logoSmall from "../../assets/icons/MyProfile_Logo.svg";

const ChatModal = ({ isOpen, onClose, chat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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

    const token = localStorage.getItem("accessToken");
    const baseUrl = import.meta.env.VITE_WS_URL || "ws://localhost:3000/ws/chat";
    const WS_URL = token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl;

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
          setMessages(
            data.messages.map((m) => ({
              id: m.id || m._id || Date.now(),
              isIncoming: m.from === chat.username,
              text: m.text,
              avatar:
                m.from === chat.username
                  ? chat.username === "nikiita"
                    ? nikitaAvatar
                    : sashaaAvatar
                  : undefined,
            })),
          );
        } else if (data.type === "message") {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              isIncoming: data.from === chat.username,
              text: data.text,
              avatar:
                data.from === chat.username
                  ? chat.username === "nikiita"
                    ? nikitaAvatar
                    : sashaaAvatar
                  : undefined,
            },
          ]);
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
  }, [isOpen, chat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen || !chat) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        isIncoming: false,
        text: message.trim(),
      };
      setMessages((prev) => [...prev, newMessage]);

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "message",
            to: chat.username,
            text: message.trim(),
          })
        );
      }

      setMessage("");
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
          <img src={chat.avatar} alt={chat.username} className={styles.headerAvatar} />
          <span className={styles.headerUsername}>{chat.username}</span>
        </div>
        <div className={styles.chatContent}>
          <div className={styles.userProfile}>
            <img src={chat.avatar} alt={chat.username} className={styles.profileAvatar} />
            <h3 className={styles.profileName}>{chat.username}</h3>
            <p className={styles.profileUsername}>{chat.username} · ICHgram</p>
            <button
              className={styles.viewProfileButton}
              type="button"
              onClick={handleViewProfile}
            >
              View profile
            </button>
            <p className={styles.timestamp}>Jun 26, 2024, 08:49 PM.</p>
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
                    src={msg.avatar}
                    alt="User"
                    className={styles.messageAvatar}
                  />
                )}
                <div
                  className={`${styles.messageBubble} ${
                    msg.isIncoming ? styles.incomingBubble : styles.outgoingBubble
                  }`}
                >
                  {msg.text}
                </div>
                {!msg.isIncoming && (
                  <img
                    src={logoSmall}
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

