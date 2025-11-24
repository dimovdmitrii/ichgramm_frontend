import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import ExplorePage from "./ExplorePage/ExplorePage";
import SearchPage from "./SearchPage/SearchPage";
import MessagesPage from "./MessagesPage/MessagesPage";
import NotifivationPage from "./NotificatrionsPage/NotificationPage";
import ResetPage from "./ResetPage/ResetPage";
import CreatePage from "./CreatePage/CreatePage";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/notifications" element={<NotifivationPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
};

export default Navigation;
