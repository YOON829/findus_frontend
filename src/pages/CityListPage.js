import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getMappedValue } from "../services/mapping";
import { Card, Typography } from "antd";
import "../css/CityListPage.css";

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function CityListPage() {
  const { regionKey } = useParams();
  const [data, setData] = useState({ region: "", cities: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions`);
  };

  useEffect(() => {
    axios
      .get(`https://findus-jp.link/api/regions/${regionKey}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching city details:", error);
        setLoading(false);
      });
  }, [regionKey]);

  if (loading) {
    return (
      <div className="findus-city-list-page-container">
        <p className="findus-loading-text">도시 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (data.cities.length === 0) {
    return (
      <div className="findus-city-list-page-container">
        <p className="findus-loading-text">이 지역에는 도시 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="findus-city-list-page-container">
      {/* <button onClick={goBack} className="back-button">
        뒤로 가기
      </button> */}

      <div className="findus-city-list-title">
        <Title level={2} className="findus-search-type-title">
          {data.region} 지역의 도시 목록
          <hr className="findus-custom-divider" />
        </Title>
      </div>
      <div className="findus-city-card-container">
        {data.cities.map((city) => {
          const cityKey = getMappedValue("city", city);
          return (
            <Link
              key={cityKey}
              to={`/regions/${regionKey}/${cityKey}`}
              className="findus-city-link"
            >
              <Card className="findus-city-card">
                <p className="findus-city-name">{city}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CityListPage;
