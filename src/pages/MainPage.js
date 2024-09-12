import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Footer from "../components/Footer";

function MainPage() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/session-check",
          {
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    checkSession();
  }, []);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", textAlign: "center" }}
    >
      <h1>메인 페이지</h1>
      <LoginButton />
      <LogoutButton />
      <Link to="/search">
        <Button type="primary">검색</Button>
      </Link>
      <Footer />
    </Space>
  );
}

export default MainPage;
