import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Container } from "@mui/system";

function Layout() {
  return (
    <div>
      <Header />
      <Container
        style={{ display: "flex", flexDirection: "column", minHeight: "85vh" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
