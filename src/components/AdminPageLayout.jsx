import { useState } from "react";
import Sidebar from "./Sidebar";

const AdminPageLayout = ({ children }) => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const handleSidebarHover = (hovered) => {
    setIsSidebarHovered(hovered);
  };

  const sidebarWidth = isSidebarHovered ? 200 : 60;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        onMouseEnter={() => handleSidebarHover(true)}
        onMouseLeave={() => handleSidebarHover(false)}
      >
        <Sidebar isHovered={isSidebarHovered} />
      </div>
      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: sidebarWidth,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminPageLayout;
