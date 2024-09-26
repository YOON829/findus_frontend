
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://findus-jp.link/api/auth/googleLogout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("서버 응답:", data);

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        console.error("네트워크 오류: 서버에 연결할 수 없습니다.");
      }
    }
  };

  return (
    <Button
      type="link"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    ></Button>
  );
};

export default LogoutButton;
