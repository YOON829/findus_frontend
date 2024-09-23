import React from "react";
import { Button } from "antd"; // Ant Design의 Button 컴포넌트 import
import { LoginOutlined } from "@ant-design/icons"; // Ant Design의 LoginOutlined 아이콘 import

const LoginButton = () => {
  const handleLogin = () => {
    const loginUrl = "http://findus-jp.link/api/auth/google";
    window.open(loginUrl, "_self");
  };

  return (
    <Button
      icon={<LoginOutlined />}
      type="link"
      className="header-icon"
      onClick={handleLogin}
    />
  );
};

export default LoginButton;
