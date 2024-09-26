import React from "react";
import { Layout, Button } from "antd";
import { GiftOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";

const { Header } = Layout;

const CustomHeader = () => {
  const { isLoggedIn, user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/event");
  };

  return (
    <div className="header-container">
      <Header className="header">
        <div className="logo-container">
          <h1>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              FIND US
            </Link>
          </h1>
        </div>
        <div className="button-group">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">안녕하세요, {user?.user_name}님!</span>
              <Button
                icon={<LogoutOutlined />}
                type="link"
                className="logout-button"
                onClick={logout}
              />
            </>
          ) : (
            <Button
              icon={<LoginOutlined />}
              type="link"
              className="login-button"
              onClick={login}
            />
          )}
          <Button
            icon={<GiftOutlined />}
            type="link"
            className="notification-button"
            onClick={handleEventClick}
          />
        </div>
      </Header>
    </div>
  );
};

export default CustomHeader;
