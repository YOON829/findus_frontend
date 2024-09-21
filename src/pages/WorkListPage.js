import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/WorkListPage.css";

const { Meta } = Card;
const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function WorkListPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/search");
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/work/all`)
      .then((response) => {
        setWorks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching work details:", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound");
        } else {
          setError("작품 목록을 가져오는 데 실패했습니다.");
        }
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <Spin size="large" className="loading-spinner" />;
  if (error) return <div className="error-message">에러: {error}</div>;

  return (
    <div className="work-list-container">
      {/* <Button
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
        className="back-button"
      >
        뒤로 가기
      </Button> */}
      <div className="title-section">
        <Title level={2} className="work-list-page-title">
          작품 목록
        </Title>
        <hr className="WLP-custom-divider" />
      </div>
      <Row gutter={[0, 16]}>
        {works.map((work) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} key={work.work_key}>
            <Link to={`/work/${work.work_key}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={work.work_name}
                    src={
                      work.poster
                        ? `${apiUrl}${work.poster}`
                        : "../uploads/poster/default_poster.webp"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "../uploads/poster/default_poster.webp";
                    }}
                  />
                }
                className="work-card"
              >
                <Meta title={work.work_name} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default WorkListPage;
