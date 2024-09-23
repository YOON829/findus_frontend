import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getMappedValue } from "../services/mapping";
import { Card, Typography } from "antd";
import "../css/DistrictListPage.css";

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function DistrictListPage() {
  const { regionKey, cityKey } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions/${regionKey}`);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/regions/${regionKey}/${cityKey}`)
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching district details:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [regionKey, cityKey]);

  if (loading) {
    return (
      <div className="findus-district-list-page-container">
        <p className="findus-loading-text">구역 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="findus-district-list-page-container">
        <p className="findus-loading-text">{error}</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="findus-district-list-page-container">
        <p className="findus-loading-text">이 지역에는 구역 정보가 없습니다.</p>
      </div>
    );
  }

  // address_district를 기준으로 중복 제거
  const uniqueDistricts = [
    ...new Set(places.map((place) => place.address_district)),
  ];

  return (
    <div className="findus-district-list-page-container">
      {/* <button onClick={goBack} className="back-button">
        뒤로 가기
      </button> */}

      <div className="findus-district-list-title">
        <Title level={2} className="findus-search-type-title">
          {places[0].address_city
            ? `${places[0].address_city}의 구역 목록`
            : `구역 목록`}
          <hr className="findus-custom-divider" />
        </Title>
      </div>
      <div className="findus-district-card-container">
        {uniqueDistricts.map((district) => {
          const districtKey = getMappedValue("district", district);
          return (
            <Link
              key={districtKey}
              to={`/regions/${regionKey}/${cityKey}/${districtKey}`}
              className="findus-district-link"
            >
              <Card className="findus-district-card">
                <p className="findus-district-name">{district}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DistrictListPage;
