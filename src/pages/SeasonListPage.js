import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/SeasonListPage.css";

const { Meta } = Card;
const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function SeasonListPage() {
  const { workKey } = useParams();
  const [workDetails, setWorkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/work");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://findus-jp.link/api/work/${workKey}`)
      .then((response) => {
        setWorkDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching work details:", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound");
        }
        setLoading(false);
      });
  }, [workKey, navigate]);

  if (loading) return <Spin size="large" className="loading-spinner" />;

  return (
    <div className="season-list-container">
      {/* <Button
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
        className="back-button"
      >
        뒤로 가기
      </Button> */}
      <div className="Page-title-section">
        <Title level={2} className="SLP-page-title">
          {workDetails?.work.work_name}
        </Title>
        <span className="SLP-title-name">시즌목록</span>
        <hr className="SLP-custom-divider" />
      </div>
      <Row gutter={[0, 16]}>
        {workDetails?.seasons.map((season) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} key={season.season_key}>
            <Link to={`/work/${workKey}/${season.season_key}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={`Season ${season.display_name}`}
                    src={
                      season.poster
                        ? `https://findus-jp.link${season.poster}`
                        : `https://findus-jp.link/uploads/poster/default_poster.webp`
                    }
                    // onError={(e) => {
                    //   e.target.onerror = null;
                    //   e.target.src = `${apiUrl}/uploads/poster/default_poster.webp`;
                    // }}
                  />
                }
                className="season-card"
              >
                <Meta
                  title={`시즌 ${season.display_name}`}
                  description={`${workDetails.work.work_name} - ${season.display_name}`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SeasonListPage;
