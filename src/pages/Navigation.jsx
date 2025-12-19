import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import LoginPage from "./Authenticate/LoginPage/LoginPage";
import RegisterPage from "./Authenticate/RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import MyProfilePage from "./MyProfilePage/MyProfilePage";
import MyProfileEdit from "./EditProfile/MyProfileEdit";
import ExplorePage from "./ExplorePage/ExplorePage";
import ResetPage from "./Authenticate/ResetPage/ResetPage";

import OtherProfilePage from "./OtherProfilePage/OtherProfilePage";
import PrivacyPolicy from "./PrivacyTerms/PrivacyPolicy/PrivacyPolicy";
import Terms from "./PrivacyTerms/Terms/Terms";
import CookiesPolicy from "./PrivacyTerms/CookiesPolicy/CookiesPolicy";
import LearnMore from "./PrivacyTerms/LearnMore/LearnMore";
import PublicRoute from "../shared/components/PublicRoute/PublicRoute";
import PrivateRoute from "../shared/components/PrivateRoute/PrivateRoute";

const Navigation = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/edit-profile" element={<MyProfileEdit />} />
        <Route path="/explore" element={<ExplorePage />} />        
        <Route path="/other-profile/:username" element={<OtherProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
