import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Home from "./views/home/home";
import Notfound from "./components/uiComponents/notFound";
import LoginPage from "./authentication/login/login";
import RegisterPage from "./authentication/register/register";
import FullWidthLayout from "./layouts/fullWidthLayout/fullWidthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      <Route path="/login" element={<FullWidthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/register" element={<FullWidthLayout />}>
        <Route index element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
