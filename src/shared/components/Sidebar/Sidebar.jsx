import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.css";
import logoIcon from "../../../assets/icons/ICHGRAM-Text.svg";
import mainIcon from "../../../assets/icons/sidebar/main.svg";
import mainBoldIcon from "../../../assets/icons/sidebar/main_bold.svg";
import searchIcon from "../../../assets/icons/sidebar/search.svg";
import searchBoldIcon from "../../../assets/icons/sidebar/search_Bold.svg";
import exploreIcon from "../../../assets/icons/sidebar/explore.svg";
import exploreBoldIcon from "../../../assets/icons/sidebar/Explore_Bold.svg";
import messengerIcon from "../../../assets/icons/sidebar/messenger.svg";
import messengerBoldIcon from "../../../assets/icons/sidebar/messenger_Bold.svg";
import notificationsIcon from "../../../assets/icons/sidebar/notifications.svg";
import notificationBoldIcon from "../../../assets/icons/sidebar/notification_Bold.svg";
import createIcon from "../../../assets/icons/sidebar/create.svg";
import profileIcon from "../../../assets/icons/Logo-small.svg";
import NotificationModal from "../../../modules/NotificationModal/NotificationModal";
import SearchModal from "../../../modules/SearchModal/SearchModal";
import MessagesListModal from "../../../modules/MessagesListModal/MessagesListModal";
import ChatModal from "../../../modules/ChatModal/ChatModal";

const Sidebar = () => {
  const location = useLocation();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    setIsNotificationModalOpen(false);
    setIsSearchModalOpen(false);
    setIsMessagesModalOpen(false);
    setSelectedChat(null);
  }, [location.pathname]);

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: mainIcon,
      iconBold: mainBoldIcon,
    },
    {
      path: "/search",
      label: "Search",
      icon: searchIcon,
      iconBold: searchBoldIcon,
      isModal: true,
    },
    {
      path: "/explore",
      label: "Explore",
      icon: exploreIcon,
      iconBold: exploreBoldIcon,
    },
    {
      path: "/messages",
      label: "Messages",
      icon: messengerIcon,
      iconBold: messengerBoldIcon,
      isModal: true,
    },
    {
      path: "/notifications",
      label: "Notification",
      icon: notificationsIcon,
      iconBold: notificationBoldIcon,
      isModal: true,
    },
    {
      path: "/create",
      label: "Create",
      icon: createIcon,
      iconBold: createIcon,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logoIcon} alt="ICHGRAM" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive =
            item.isModal
              ? item.path === "/notifications"
                ? isNotificationModalOpen
                : item.path === "/search"
                ? isSearchModalOpen
                : item.path === "/messages"
                ? isMessagesModalOpen
                : false
              : location.pathname === item.path;
          const handleClick = () => {
            if (item.isModal) {
              if (item.path === "/notifications") {
                setIsNotificationModalOpen((prev) => !prev);
                setIsSearchModalOpen(false);
                setIsMessagesModalOpen(false);
                setSelectedChat(null);
              } else if (item.path === "/search") {
                setIsSearchModalOpen((prev) => !prev);
                setIsNotificationModalOpen(false);
                setIsMessagesModalOpen(false);
                setSelectedChat(null);
              } else if (item.path === "/messages") {
                setIsMessagesModalOpen((prev) => !prev);
                setIsNotificationModalOpen(false);
                setIsSearchModalOpen(false);
                if (!isMessagesModalOpen) {
                  setSelectedChat(null);
                }
              }
            }
          };
          
          if (item.isModal) {
            return (
              <button
                key={item.path}
                onClick={handleClick}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <img
                  src={isActive ? item.iconBold : item.icon}
                  alt={item.label}
                  className={styles.icon}
                />
                <span
                  className={`${styles.label} ${
                    isActive ? styles.labelBold : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                setIsNotificationModalOpen(false);
                setIsSearchModalOpen(false);
                setIsMessagesModalOpen(false);
                setSelectedChat(null);
              }}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img
                src={isActive ? item.iconBold : item.icon}
                alt={item.label}
                className={styles.icon}
              />
              <span
                className={`${styles.label} ${
                  isActive ? styles.labelBold : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <Link
        to="/profile"
        onClick={() => {
          setIsNotificationModalOpen(false);
          setIsSearchModalOpen(false);
          setIsMessagesModalOpen(false);
          setSelectedChat(null);
        }}
        className={styles.profileItem}
      >
        <img src={profileIcon} alt="Profile" className={styles.avatarIcon} />
        <span
          className={`${styles.label} ${
            location.pathname === "/profile" ? styles.labelBold : ""
          }`}
        >
          Profile
        </span>
      </Link>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
      <MessagesListModal
        isOpen={isMessagesModalOpen}
        onClose={() => {
          setIsMessagesModalOpen(false);
          setSelectedChat(null);
        }}
        onSelectChat={(chat) => setSelectedChat(chat)}
        selectedChatId={selectedChat?.id}
      />
      <ChatModal
        isOpen={isMessagesModalOpen && !!selectedChat}
        onClose={() => {
          setSelectedChat(null);
          setIsMessagesModalOpen(false);
        }}
        chat={selectedChat}
      />
    </aside>
  );
};

export default Sidebar;
