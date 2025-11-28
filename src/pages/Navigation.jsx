import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import LoginPage from "./Authenticate/LoginPage/LoginPage";
import RegisterPage from "./Authenticate/RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ProfilePage from "./MyProfilePage/MyProfilePage";
import ExplorePage from "./ExplorePage/ExplorePage";
import SearchPage from "./SearchPage/SearchPage";
import MessagesPage from "./MessagesPage/MessagesPage";
import NotifivationPage from "./NotificatrionsPage/NotificationPage";
import ResetPage from "./Authenticate/ResetPage/ResetPage";
import CreatePage from "./CreatePage/CreatePage";
import EditProfilePage from "./MyProfilePage/EditProfile";
import MyPostPage from "./MyProfilePage/MyPostPage";
import AddPostPage from "./MyProfilePage/AddPostPage";
import EditPostPage from "./MyProfilePage/EditPostPage";
import MyProfilePage from "./MyProfilePage/MyProfilePage";
import OtherPostPage from "./OtherProfilePage/OtherPostPage";
import OtherProfilePage from "./OtherProfilePage/OtherProfilePage";
import PrivacyPolicy from "./PrivacyTerms/PrivacyPolicy/PrivacyPolicy";
import Terms from "./PrivacyTerms/Terms/Terms";
import CookiesPolicy from "./PrivacyTerms/CookiesPolicy/CookiesPolicy";
import LearnMore from "./PrivacyTerms/LearnMore/LearnMore";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/notifications" element={<NotifivationPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/my-posts" element={<MyPostPage />} />
      <Route path="/add-post" element={<AddPostPage />} />
      <Route path="/edit-post" element={<EditPostPage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
      <Route path="/other-posts" element={<OtherPostPage />} />
      <Route path="/other-profile" element={<OtherProfilePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />
      <Route path="/learn-more" element={<LearnMore />} />
    </Routes>
  );
};

export default Navigation;
