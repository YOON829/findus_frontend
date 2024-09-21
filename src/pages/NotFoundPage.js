import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import "../css/NotFoundPage.css";

const { Title, Paragraph } = Typography;

function NotFoundPage() {
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1); // -1은 이전 페이지로 이동하는 것을 의미합니다.
  };

  // 홈으로 이동하는 함수
  const goHome = () => {
    navigate("/"); // 홈 경로로 이동
  };

  return (
    <div className="not-found-container">
      <FrownOutlined className="not-found-icon" />
      <Title level={2}>404 - 페이지를 찾을 수 없습니다.</Title>
      <Paragraph>죄송합니다. 찾으시는 페이지가 존재하지 않습니다.</Paragraph>
      <Button type="primary" onClick={goBack} className="back-button">
        이전 페이지로 돌아가기
      </Button>
      <Button type="default" onClick={goHome} className="home-button">
        홈으로 가기
      </Button>
    </div>
  );
}

export default NotFoundPage;
