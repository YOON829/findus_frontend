import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../css/Footer.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMapClick = () => {
    const targetPath = "/multi-marker";
    navigate(targetPath);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="footer-container">
      <div className="footer">
        <HomeOutlined
          className={`footer-icon ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        />
        <EnvironmentOutlined
          className={`footer-icon ${isActive("/multi-marker") ? "active" : ""}`}
          onClick={handleMapClick}
        />
        <SearchOutlined
          className={`footer-icon ${isActive("/search") ? "active" : ""}`}
          onClick={() => navigate("/search")}
        />
        <UserOutlined
          className={`footer-icon ${isActive("/mypage") ? "active" : ""}`}
          onClick={() => navigate("/mypage")}
        />
      </div>
    </div>
  );
}

export default Footer;
