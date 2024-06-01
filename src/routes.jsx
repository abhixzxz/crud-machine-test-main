import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import FullWidthLayout from "./layouts/fullWidthLayout/fullWidthLayout";
import Notfound from "./components/uiComponents/notFound";
import LoginPage from "./authentication/login/login";
import RegisterPage from "./authentication/register/register";
import CompaniesDetails from "./views/companyDetails/companyDetails";
import EmployeeDetails from "./views/employeeDetails/employeeDetails";
import PrivateRoute from "./components/privateRoutes/privateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/company-details"
          element={
            <PrivateRoute>
              <CompaniesDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-details"
          element={
            <PrivateRoute>
              <EmployeeDetails />
            </PrivateRoute>
          }
        />
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
