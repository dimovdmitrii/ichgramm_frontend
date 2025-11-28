import { useEffect, useState } from "react";
import styles from "./ChatModal.module.css";
import sashaaAvatar from "../../assets/Images/sashaa.jpg";
import nikitaAvatar from "../../assets/Images/nikita.jpg";
import logoSmall from "../../assets/icons/Logo-small.svg";

const ChatModal = ({ isOpen, onClose, chat }) => {
  const [message, setMessage] = useState("");

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

  if (!isOpen || !chat) return null;

  const messages = [
    {
      id: 1,
      isIncoming: true,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avatar: chat.username === "nikiita" ? nikitaAvatar : sashaaAvatar,
    },
    {
      id: 2,
      isIncoming: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Здесь будет логика отправки сообщения
      setMessage("");
    }
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
            <button className={styles.viewProfileButton}>View profile</button>
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

