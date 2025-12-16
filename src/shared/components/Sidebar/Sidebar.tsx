import { useState, useEffect, FC } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.css";
import logoIcon from "../../../assets/icons/Logo_Text_Max.svg";
import mainIcon from "../../../assets/icons/sidebar/main.svg";
import mainBoldIcon from "../../../assets/icons/sidebar/main_bold.svg";
import searchIcon from "../../../assets/icons/sidebar/search.svg";
import searchBoldIcon from "../../../assets/icons/sidebar/search_Bold.svg";
import exploreIcon from "../../../assets/icons/sidebar/explore.svg";
import exploreBoldIcon from "../../../assets/icons/sidebar/Explore_Bold.svg";
import messengerIcon from "../../../assets/icons/sidebar/messenger.svg";
import messengerBoldIcon from "../../../assets/icons/sidebar/messenger_Bold.svg";
import notificationsIcon from "../../../assets/icons/sidebar/notifications.svg";
import notificationBoldIcon from "../../../assets/icons/sidebar/Heart_Bold.svg";
import createIcon from "../../../assets/icons/sidebar/create.svg";
import profileIcon from "../../../assets/icons/MyProfile_Logo.svg";
import NotificationModal from "../../../modules/NotificationModal/NotificationModal";
import SearchModal from "../../../modules/SearchModal/SearchModal";
import MessagesListModal from "../../../modules/MessagesListModal/MessagesListModal";
import ChatModal from "../../../modules/ChatModal/ChatModal";
import CreatePostModal from "../../../modules/CreatePostModal/CreatePostModal";

interface Chat {
  id: number;
  username: string;
  avatar: string;
  lastMessage?: string;
  time?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
  iconBold: string;
  isModal?: boolean;
}

const Sidebar: FC = () => {
  const location = useLocation();
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] =
    useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    setIsNotificationModalOpen(false);
    setIsSearchModalOpen(false);
    setIsMessagesModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedChat(null);
  }, [location.pathname]);

  const navItems: NavItem[] = [
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
      isModal: true,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logoIcon} alt="ICHGRAM" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = item.isModal
            ? item.path === "/notifications"
              ? isNotificationModalOpen
              : item.path === "/search"
              ? isSearchModalOpen
              : item.path === "/messages"
              ? isMessagesModalOpen
              : item.path === "/create"
              ? isCreateModalOpen
              : false
            : location.pathname === item.path;
          const handleClick = () => {
            if (item.isModal) {
              if (item.path === "/notifications") {
                setIsNotificationModalOpen((prev) => !prev);
                setIsSearchModalOpen(false);
                setIsMessagesModalOpen(false);
                setIsCreateModalOpen(false);
                setSelectedChat(null);
              } else if (item.path === "/search") {
                setIsSearchModalOpen((prev) => !prev);
                setIsNotificationModalOpen(false);
                setIsMessagesModalOpen(false);
                setIsCreateModalOpen(false);
                setSelectedChat(null);
              } else if (item.path === "/messages") {
                setIsMessagesModalOpen((prev) => !prev);
                setIsNotificationModalOpen(false);
                setIsSearchModalOpen(false);
                setIsCreateModalOpen(false);
                if (!isMessagesModalOpen) {
                  setSelectedChat(null);
                }
              } else if (item.path === "/create") {
                setIsCreateModalOpen((prev) => !prev);
                setIsNotificationModalOpen(false);
                setIsSearchModalOpen(false);
                setIsMessagesModalOpen(false);
                setSelectedChat(null);
              }
            }
          };

          const iconSrc = isActive ? item.iconBold : item.icon;

          if (item.isModal) {
            return (
              <button
                key={item.path}
                onClick={handleClick}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <img src={iconSrc} alt={item.label} className={styles.icon} />
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
                setIsCreateModalOpen(false);
                setSelectedChat(null);
              }}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img src={iconSrc} alt={item.label} className={styles.icon} />
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
          setIsCreateModalOpen(false);
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
        onSelectChat={(chat: Chat) => setSelectedChat(chat)}
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
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        editPost={undefined}
        onSave={undefined}
      />
    </aside>
  );
};

export default Sidebar;
