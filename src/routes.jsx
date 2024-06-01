import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Home from "./views/home/home";
import Notfound from "./components/uiComponents/notFound";
import LoginPage from "./authentication/login/login";
import RegisterPage from "./authentication/register/register";
import FullWidthLayout from "./layouts/fullWidthLayout/fullWidthLayout";
import CompaniesDetails from "./views/companyDetails/companyDetails";
import EmployeeDetails from "./views/employeeDetails/employeeDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/company-details" element={<CompaniesDetails />} />
        <Route index path="/employee-details" element={<EmployeeDetails />} />

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
