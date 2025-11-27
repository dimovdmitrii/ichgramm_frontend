import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logoIcon from "../../../assets/icons/ICHGRAM-Text.svg";
import mainIcon from "../../../assets/icons/sidebar/main.svg";
import mainBoldIcon from "../../../assets/icons/sidebar/main_bold.svg";
import searchIcon from "../../../assets/icons/sidebar/search.svg";
import searchBoldIcon from "../../../assets/icons/sidebar/search_Bold.svg";
import exploreIcon from "../../../assets/icons/sidebar/explore.svg";
import exploreBoldIcon from "../../../assets/icons/sidebar/explore_Bold.svg";
import messengerIcon from "../../../assets/icons/sidebar/messenger.svg";
import messengerBoldIcon from "../../../assets/icons/sidebar/messenger_Bold.svg";
import notificationsIcon from "../../../assets/icons/sidebar/notifications.svg";
import notificationBoldIcon from "../../../assets/icons/sidebar/notification_Bold.svg";
import createIcon from "../../../assets/icons/sidebar/create.svg";
import profileIcon from "../../../assets/icons/Logo-small.svg";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: "/home", 
      label: "Home", 
      icon: mainIcon, 
      iconBold: mainBoldIcon 
    },
    { 
      path: "/search", 
      label: "Search", 
      icon: searchIcon, 
      iconBold: searchBoldIcon 
    },
    { 
      path: "/explore", 
      label: "Explore", 
      icon: exploreIcon, 
      iconBold: exploreBoldIcon 
    },
    { 
      path: "/messages", 
      label: "Messages", 
      icon: messengerIcon, 
      iconBold: messengerBoldIcon 
    },
    { 
      path: "/notifications", 
      label: "Notification", 
      icon: notificationsIcon, 
      iconBold: notificationBoldIcon 
    },
    { 
      path: "/create", 
      label: "Create", 
      icon: createIcon, 
      iconBold: createIcon 
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logoIcon} alt="ICHGRAM" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img 
                src={isActive ? item.iconBold : item.icon} 
                alt={item.label} 
                className={styles.icon} 
              />
              <span className={`${styles.label} ${isActive ? styles.labelBold : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <Link to="/profile" className={styles.profileItem}>
        <img src={profileIcon} alt="Profile" className={styles.avatarIcon} />
        <span className={`${styles.label} ${location.pathname === "/profile" ? styles.labelBold : ""}`}>
          Profile
        </span>
      </Link>
    </aside>
  );
};

export default Sidebar;

