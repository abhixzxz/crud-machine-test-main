import { Outlet } from "react-router-dom";

function FullWidthLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}

export default FullWidthLayout;
