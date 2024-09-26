import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import {
  Button,
  List,
  Row,
  Col,
  Divider,
  Collapse,
  Spin,
  Alert,
  Typography,
  Image,
  message,
} from "antd";
import { CopyOutlined, ShareAltOutlined } from "@ant-design/icons";
import "../css/SingleMarker.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import BookmarkButton from "./BookmarkButton";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const mapContainerStyle = {
  width: "100%",
  height: "40vh",
};

function SingleMarkerMap({ markerId }) {
  const [markerData, setMarkerData] = useState(null);
  const [sortedImages, setSortedImages] = useState([]);
  const [work, setWork] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const markerResponse = await axios.get(
          `https://findus-jp.link/api/place/${markerId}`
        );
        setMarkerData(markerResponse.data);

        const images = markerResponse.data.Images;
        const sorted = images.sort((a, b) => {
          if (a.image_url.includes("realPlace")) return -1;
          if (b.image_url.includes("realPlace")) return 1;
          if (a.image_url.includes("aniPlace")) return -1;
          if (b.image_url.includes("aniPlace")) return 1;
          return 0;
        });
        setSortedImages(sorted);

        if (markerResponse.data.Work) {
          setWork(markerResponse.data.Work);
        }
      } catch (error) {
        console.error("Error fetching marker data:", error);
        setError("데이터를 가져오는 데 실패했습니다.");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://findus-jp.link/api/reviews/place/${markerId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰를 가져오는 데 실패했습니다:", error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`https://findus-jp.link/api/auth/session-check`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setUser(null);
      }
    };

    fetchMarkerData();
    fetchReviews();
    checkLoginStatus();
  }, [markerId]);

  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";
  };

  const handleMapClick = () => {
    if (markerData) {
      navigate(`/multi-marker/${markerData.place_id}`);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(markerData.detailed_address);
    message.success("주소가 클립보드에 복사되었습니다.");
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("공유 링크가 클립보드에 복사되었습니다.");
  };

  const formatOpeningHours = (hours) => {
    if (hours === "nan") return "정보 없음";

    return hours.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div className="single-marker-container">
      <div className="content-wrapper">
        {error && (
          <Alert
            message="에러"
            description={error}
            type="error"
            showIcon
            className="error-alert"
          />
        )}

        <div className="image-carousel">
          <Carousel
            showThumbs={true}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
            thumbWidth={60}
            renderThumbs={() =>
              sortedImages.map((image, index) => (
                <img
                  key={index}
                  src={`https://findus-jp.link/${image.image_url}`}
                  alt={`Thumbnail ${index + 1}`}
                  onError={handleImageError}
                />
              ))
            }
          >
            {sortedImages.map((image, index) => (
              <div key={index}>
                <Image
                  src={`https://findus-jp.link/${image.image_url}`}
                  alt={`Location ${index + 1}`}
                  onError={handleImageError}
                  preview={{
                    mask: "클릭하여 확대",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="marker-header">
          <div className="marker-actions">
            <BookmarkButton placeId={markerId} />
            <Button onClick={handleCopyShareLink} icon={<ShareAltOutlined />}>
              링크 복사
            </Button>
          </div>
        </div>

        <Divider className="info-divider" />

        {markerData ? (
          <div className="info-panel-content">
            <List
              itemLayout="horizontal"
              dataSource={[0]}
              renderItem={() => (
                <>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">상세 주소</strong>}
                      description={
                        <div className="address-container">
                          <Text className="info-description">
                            {markerData.detailed_address}
                          </Text>
                          <Button
                            icon={<CopyOutlined />}
                            onClick={handleCopyAddress}
                          >
                            복사
                          </Button>
                        </div>
                      }
                    />
                  </List.Item>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">작품 이름</strong>}
                      description={
                        <span className="info-description">
                          {work ? work.work_name : "정보 없음"}
                        </span>
                      }
                    />
                  </List.Item>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">설명</strong>}
                      description={
                        <span className="info-description">
                          {markerData.description}
                        </span>
                      }
                    />
                  </List.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <List.Item className="info-section">
                        <List.Item.Meta
                          title={<strong className="info-title">시즌</strong>}
                          description={
                            <span className="info-description">
                              {work ? work.work_season : "정보 없음"}
                            </span>
                          }
                        />
                      </List.Item>
                    </Col>
                    <Col span={12}>
                      <List.Item className="info-section">
                        <List.Item.Meta
                          title={<strong className="info-title">에피소드</strong>}
                          description={
                            <span className="info-description">
                              {work ? work.work_ep : "정보 없음"}
                            </span>
                          }
                        />
                      </List.Item>
                    </Col>
                  </Row>
                  <Divider className="info-divider" />
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">최근 촬영일</strong>}
                      description={
                        <span className="info-description">
                          {markerData.latestshot_date}
                        </span>
                      }
                    />
                  </List.Item>
                </>
              )}
            />
            <Divider className="info-divider" />
            <Collapse accordion className="opening-hours-collapse">
              <Panel header="영업시간" key="1">
                <p>{formatOpeningHours(markerData.opening_hours)}</p>
              </Panel>
            </Collapse>
            <Divider className="info-divider" />

            <div className="map-container">
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: parseFloat(markerData.latitude),
                    lng: parseFloat(markerData.longitude),
                  }}
                  zoom={18}
                  onClick={handleMapClick}
                  options={{
                    fullscreenControl: true,
                    zoomControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    scaleControl: false,
                    rotateControl: false,
                  }}
                >
                  <Marker
                    position={{
                      lat: parseFloat(markerData.latitude),
                      lng: parseFloat(markerData.longitude),
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            </div>

            <Divider className="info-divider" />

            <ReviewForm
              placeId={markerId}
              user={user}
              onReviewSubmitted={handleReviewSubmitted}
            />
            <ReviewList reviews={reviews} />
          </div>
        ) : (
          <Spin tip="상세 정보 로딩 중..." />
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default SingleMarkerMap;