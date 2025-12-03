import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import LoginPage from "./Authenticate/LoginPage/LoginPage";
import RegisterPage from "./Authenticate/RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import MyProfilePage from "./MyProfilePage/MyProfilePage";
import MyProfileEdit from "./EditProfile/MyProfileEdit";
import ExplorePage from "./ExplorePage/ExplorePage";
import ResetPage from "./Authenticate/ResetPage/ResetPage";
import CreatePage from "./CreatePage/CreatePage";
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
      <Route path="/profile" element={<MyProfilePage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
      <Route path="/edit-profile" element={<MyProfileEdit />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/create" element={<CreatePage />} />
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
