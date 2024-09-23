import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Card, Spin } from "antd";
import CustomHeader from "../components/Header";
import Footer from "../components/Footer";
import "../css/MainPage.css";

const { Meta } = Card;

function MainPage() {
  const [regionPlaces, setRegionPlaces] = useState([]);
  const [latestPlaces, setLatestPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 랜덤으로 n개의 아이템을 선택하는 함수
  const getRandomItems = (array, n) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/PLACE/");
        const placesData = response.data;

        // 도쿄 지역의 장소만 필터링
        const tokyoPlacesData = placesData.filter(
          (place) => place.address_region === "도쿄"
        );

        // 도쿄 지역에서 랜덤으로 5개 선택
        const randomTokyoPlaces = getRandomItems(tokyoPlacesData, 10);

        // updated_at 기준으로 정렬하여 최신 5개 선택
        const latestUpdatedPlaces = [...placesData]
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 10);

        // 선택된 장소들의 상세 정보 가져오기
        const fetchDetailedPlaces = async (places) => {
          return await Promise.all(
            places.map(async (place) => {
              const detailResponse = await axios.get(
                `http://localhost:5000/api/place/${place.place_id}`
              );
              return {
                ...place,
                work: detailResponse.data.Work,
                // userUpload 이미지만 필터링하여 사용
                images: detailResponse.data.Images.filter((img) =>
                  img.image_url.includes("userUpload")
                ),
              };
            })
          );
        };

        const detailedRegionPlaces = await fetchDetailedPlaces(
          randomTokyoPlaces
        );
        const detailedLatestPlaces = await fetchDetailedPlaces(
          latestUpdatedPlaces
        );

        setRegionPlaces(detailedRegionPlaces);
        setLatestPlaces(detailedLatestPlaces);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" className="loading-spinnerMain" />;
  }

  // 장소 카드를 렌더링하는 함수 (Carousel로 수정)
  const renderPlaceCards = (places, title, showDescription) => (
    <section className="places-section">
      <h2 className="section-title">{title}</h2>
      <Carousel
        autoPlay={true}
        interval={3500}
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true} // 이 설정으로 무한 루프가 적용됨
        showStatus={false}
        showIndicators={false}
        swipeable={true} // 사용자가 손가락으로 슬라이드 이동 가능하게 함
        emulateTouch={true} // 터치 동작을 지원
        stopOnHover={false} // 마우스 오버 시 자동 재생 멈춤 설정 해제
        className="places-carousel"
      >
        {places.map((place) => (
          <div key={place.place_id} className="carousel-slide">
            <Card
              hoverable
              cover={
                place.images.length > 0 ? (
                  <img
                    alt={place.place_name}
                    src={`http://localhost:5000${place.images[0]?.image_url}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/fallback/image.jpg";
                    }}
                    className="place-imageMain"
                  />
                ) : (
                  <img
                    src="/path/to/fallback/image.jpg"
                    alt="이미지를 사용할 수 없음"
                    className="place-imageMain"
                  />
                )
              }
              className="place-cardMain"
              onClick={() => navigate(`/single-marker/${place.place_id}`)}
            >
              <Meta
                title={place.place_name}
                description={showDescription ? `${place.work.work_name}` : null}
                className="card-meta"
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );

  return (
    <div className="main-container">
      <CustomHeader />
      <main className="main-content">
        {renderPlaceCards(regionPlaces, "지금 가볼 만한 로케이션", false)}
        {renderPlaceCards(latestPlaces, "최신 업데이트 로케이션", true)}
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
