import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  Button,
  List,
  Row,
  Col,
  Divider,
  Spin,
  Alert,
  Typography,
  Image,
  message,
} from "antd";
import { CopyOutlined, ShareAltOutlined } from "@ant-design/icons";
import "../css/InfoPanel.css";
import BookmarkButton from "./BookmarkButton";

const { Title, Text } = Typography;

// 구글 맵의 컨테이너 스타일을 정의
const mapContainerStyle = {
  width: "100%",
  height: "40vh",
};

const InfoPanel = ({ selectedMarker }) => {
  const [work, setWork] = useState(null);
  const [realPlaceImages, setRealPlaceImages] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY",
  });

  useEffect(() => {
    if (selectedMarker) {
      fetch(`https://findus-jp.link/api/place/${selectedMarker.place_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Work) {
            setWork(data.Work);
          }
          if (data.Images && Array.isArray(data.Images)) {
            // 'realPlace' 이미지만 필터링
            const realImages = data.Images.filter((image) =>
              image.image_url.includes("realPlace")
            );
            setRealPlaceImages(realImages);
          } else {
            console.error("Unexpected image data structure:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
          setError("데이터를 가져오는 데 실패했습니다.");
        });
    }
  }, [selectedMarker]);

  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";
  };

  const handleMapClick = () => {
    if (selectedMarker) {
      navigate(`/multi-marker/${selectedMarker.place_id}`);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedMarker.detailed_address);
    message.success("주소가 클립보드에 복사되었습니다.");
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("공유 링크가 클립보드에 복사되었습니다.");
  };

  if (loadError) {
    return <div>맵을 불러오는 중 에러가 발생했습니다.</div>;
  }

  if (!isLoaded) {
    return <Spin tip="로딩 중..." className="loading-spinner" />;
  }

  if (error)
    return (
      <Alert
        message="에러"
        description={error}
        type="error"
        showIcon
        className="error-alert"
      />
    );

  if (!selectedMarker) return null;

  return (
    <div className="info-panel-container">
      <div className="marker-title">
        <Title level={2}>{selectedMarker.place_name}</Title>
      </div>
      <Divider className="info-divider" />
      <div className="content-wrapper">
        {realPlaceImages.length > 0 ? (
          <div className="image-gallery">
            {realPlaceImages.map((image, index) => (
              <div key={index} className="image-item">
                <Image
                  src={`https://findus-jp.link${image.image_url}`}
                  alt={`Image ${index + 1}`}
                  onError={handleImageError}
                  preview={{
                    mask: "클릭하여 확대",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-image">
            <p>표시할 'realPlace' 이미지가 없습니다.</p>
          </div>
        )}

        <div className="info-panel-header">
          {/* 왼쪽에 위치할 '로케이션 상세보기' 버튼 */}
          <Link to={`/single-marker/${selectedMarker.place_id}`}>
            <Button className="info-panel-button">로케이션 상세보기</Button>
          </Link>

          {/* 오른쪽에 위치할 다른 버튼들 */}
          <div className="marker-actions">
            <BookmarkButton placeId={selectedMarker.place_id} />
            <Button
              className="Linkbutton"
              onClick={handleCopyShareLink}
              icon={<ShareAltOutlined />}
            >
              링크 복사
            </Button>
          </div>
        </div>

        <Divider className="info-divider" />

        <div className="info-panel-content">
          <List
            itemLayout="horizontal"
            dataSource={[0]}
            renderItem={() => (
              <>
                {work && (
                  <>
                    <List.Item className="info-section">
                      <List.Item.Meta
                        title={
                          <strong className="info-title">작품 이름</strong>
                        }
                        description={
                          <span className="info-description">
                            {work.work_name}
                          </span>
                        }
                      />
                    </List.Item>
                  </>
                )}
                <List.Item className="info-section">
                  <List.Item.Meta
                    title={<strong className="info-title">설명</strong>}
                    description={
                      <span className="info-description">
                        {selectedMarker.description}
                      </span>
                    }
                  />
                </List.Item>
                <Row gutter={0}>
                  <Col span={8}>
                    <List.Item className="info-section">
                      <List.Item.Meta
                        title={<strong className="info-title">지역</strong>}
                        description={
                          <span className="info-description">
                            {selectedMarker.address_region}
                          </span>
                        }
                      />
                    </List.Item>
                  </Col>
                  <Col span={8}>
                    <List.Item className="info-section">
                      <List.Item.Meta
                        title={<strong className="info-title">도시</strong>}
                        description={
                          <span className="info-description">
                            {selectedMarker.address_city}
                          </span>
                        }
                      />
                    </List.Item>
                  </Col>
                  <Col span={8}>
                    <List.Item className="info-section">
                      <List.Item.Meta
                        title={<strong className="info-title">구역</strong>}
                        description={
                          <span className="info-description">
                            {selectedMarker.address_district}
                          </span>
                        }
                      />
                    </List.Item>
                  </Col>
                </Row>
                <Divider className="info-divider" />
                <List.Item className="info-section">
                  <List.Item.Meta
                    title={<strong className="info-title">상세 주소</strong>}
                    description={
                      <div className="address-container">
                        <Text className="info-description">
                          {selectedMarker.detailed_address}
                        </Text>
                        <Button
                          className="info-copybutton"
                          icon={<CopyOutlined />}
                          onClick={handleCopyAddress}
                        >
                          복사
                        </Button>
                      </div>
                    }
                  />
                </List.Item>
              </>
            )}
          />
        </div>
      </div>
      <Divider className="info-divider" />
    </div>
  );
};

export default InfoPanel;
