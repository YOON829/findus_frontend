
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Typography } from "antd";
import { ReadOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "../css/SearchTypePage.css";

const { Title } = Typography;

const SearchTypePage = () => {
  return (
    <div className="search-type-container">
      <div className="title-container">
        <Title level={2} className="search-type-title">
          조회 기준 선택
        </Title>
        <hr className="custom-divider" />
      </div>
      <div className="search-type-options">
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Link to="/work" className="search-type-link">
              <Card
                hoverable
                className="search-type-card"
                cover={<ReadOutlined className="search-type-icon" />}
              >
                <div className="search-type-card-content">
                  <h3 className="search-type-card-title">작품으로 조회</h3>
                  <p className="search-type-card-description">
                    작품을 기준으로 로케이션을 조회합니다
                  </p>
                  <div className="search-type-button-container">
                    <Button type="primary" className="search-type-button">
                      선택
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/regions" className="search-type-link">
              <Card
                hoverable
                className="search-type-card"
                cover={<EnvironmentOutlined className="search-type-icon" />}
              >
                <div className="search-type-card-content">
                  <h3 className="search-type-card-title">지역으로 조회</h3>
                  <p className="search-type-card-description">
                    지역을 기준으로 로케이션을 조회합니다
                  </p>
                  <div className="search-type-button-container">
                    <Button type="primary" className="search-type-button">
                      선택
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchTypePage;
