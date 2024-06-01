import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
