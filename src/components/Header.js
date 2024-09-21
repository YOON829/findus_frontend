// src/components/Header.js
import React from "react";
import { Layout, Button } from "antd";
import { BellOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import "../css/Header.css";

const { Header } = Layout;

const CustomHeader = () => {
  const { isLoggedIn, user, login, logout } = useAuth();

  return (
    <div className="header-container">
      <Header className="header">
        <div className="logo-container">
          <h1>FIND US</h1>
        </div>
        <div className="button-group">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">
                안녕하세요, {user?.user_name}님!
              </span>
              <Button
                icon={<LogoutOutlined />}
                type="link"
                className="logout-button"
                onClick={logout}
              ></Button>
            </>
          ) : (
            <Button
              icon={<LoginOutlined />}
              type="link"
              className="login-button"
              onClick={login}
            ></Button>
          )}
          <Button
            icon={<BellOutlined />}
            type="link"
            className="notification-button"
          />
        </div>
      </Header>
    </div>
  );
};

export default CustomHeader;
