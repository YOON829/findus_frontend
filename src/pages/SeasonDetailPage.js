import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Spin, Alert, Image, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "../css/SeasonDetailPage.css";
import ScrollToTopButton from "../components/ScrollToTopButton"; // ScrollToTopButton 컴포넌트 임포트

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const apiUrl = process.env.REACT_APP_API_URL;

function SeasonDetailPage() {
  const { workKey, seasonKey } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [places, setPlaces] = useState([]);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [itemsPerLoad] = useState(5); // 한 번에 로드할 항목 수
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/work/${workKey}/${seasonKey}`
        );
        setSeasonDetails(response.data.seasonDetails);
        setPlaces(response.data.places);
        setVisiblePlaces(response.data.places.slice(0, itemsPerLoad));
        setHasMore(response.data.places.length > itemsPerLoad);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound", { replace: true });
        } else {
          setError("데이터를 가져오는 데 실패했습니다.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [workKey, seasonKey, navigate, itemsPerLoad]);

  const fetchMoreData = () => {
    if (visiblePlaces.length >= places.length) {
      setHasMore(false);
      return;
    }
    const nextPlaces = places.slice(
      visiblePlaces.length,
      visiblePlaces.length + itemsPerLoad
    );
    setVisiblePlaces([...visiblePlaces, ...nextPlaces]);
  };

  if (loading) return <Spin tip="로딩 중..." className="loading-spinner" />;
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
  if (!seasonDetails)
    return (
      <Alert
        message="시즌 정보를 찾을 수 없습니다."
        type="warning"
        showIcon
        className="warning-alert"
      />
    );

  return (
    <div className="season-detail-container">
      {/* <Button onClick={goBack} className="back-button">
        뒤로 가기
      </Button> */}
      <div className="SDP-Title-section">
        <Title level={2}>
          {seasonDetails.work_name} - {seasonDetails.work_season}기
        </Title>
        <hr className="SDP-custom-divider" />
      </div>
      <Card className="season-info-card">
        {seasonDetails.poster && (
          <Image
            src={`${apiUrl}${seasonDetails.poster}`}
            alt={seasonDetails.work_name}
            className="season-poster"
          />
        )}

        <Paragraph>
          <Text strong>장르:</Text> {seasonDetails.genre}
        </Paragraph>
        <Paragraph>
          <Text strong>감독:</Text> {seasonDetails.director}
        </Paragraph>
        <Paragraph>
          <Text strong>각본:</Text> {seasonDetails.series_writer}
        </Paragraph>
        <Paragraph>
          <Text strong>방영 기간:</Text> {seasonDetails.start_date} ~{" "}
          {seasonDetails.end_date}
        </Paragraph>

        <Paragraph>{seasonDetails.description}</Paragraph>

      </Card>
      <div className="SDP-Place-info">
        <Title level={3} style={{ marginTop: "20px" }}>
          로케이션
        </Title>
        <hr className="SDP-custom-dividerB" />
      </div>
      <InfiniteScroll
        dataLength={visiblePlaces.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spin tip="로딩 중..." />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>모든 장소를 불러왔습니다.</b>
          </p>
        }
      >
        <div className="cards-container">
          {visiblePlaces.map((place) => {
            // 이미지 URL 설정
            let imageUrl = "https://via.placeholder.com/240x200?text=No+Image";
            if (place.Images && place.Images.length > 0) {
              const realPlaceImage = place.Images.find((img) =>
                img.image_url.includes("realPlace")
              );
              if (realPlaceImage) {
                imageUrl = `${apiUrl}${realPlaceImage.image_url}`;
              }
            }

            return (
              <Card
                key={place.place_id}
                hoverable
                className="place-card"
                cover={<img alt={place.place_name} src={imageUrl} />}
                onClick={() => navigate(`/single-marker/${place.place_id}`)}
              >
                <Meta title={place.place_name} />
              </Card>
            );
          })}
        </div>
      </InfiniteScroll>
      <ScrollToTopButton />
    </div>
  );
}

export default SeasonDetailPage;
