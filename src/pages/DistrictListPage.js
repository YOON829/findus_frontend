import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import { getMappedValue } from '../services/mapping'; // 매핑 함수 가져오기


const apiUrl = process.env.REACT_APP_API_URL;

function DistrictListPage() {
  const { regionKey, cityKey } = useParams();  // URL에서 regionKey와 cityKey 추출
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // 오류 상태 추가
  const navigate = useNavigate();  // 뒤로 가기 위해 useNavigate 훅 사용

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions/${regionKey}`);  // regionKey까지만 있는 경로로 이동
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/regions/${regionKey}/${cityKey}`)  // API 요청
      .then(response => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching district details:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [regionKey, cityKey]);

  if (loading) {
    return <p>Loading district details...</p>;
  }

  if (error) {
    return <p>{error}</p>;  // 에러 발생 시 메시지 표시
  }

  if (places.length === 0) {
    return <p>No places available for this district.</p>;  // 장소가 없을 때 표시
  }

  // address_district를 기준으로 중복 제거
  const uniqueDistricts = [...new Set(places.map(place => place.address_district))];

  return (
      <div>
        <button onClick={goBack}>뒤로 가기</button>

        <h1>
          {places[0].address_city ? `${places[0].address_city}의 구역 목록` : `구역 목록`}
        </h1>

        <ul>
          {uniqueDistricts.map((district, index) => {
            const districtKey = getMappedValue('district', district);  // 매핑된 districtKey로 링크 생성
            return (
                <li key={index}>
                  <Link to={`/regions/${regionKey}/${cityKey}/${districtKey}`}>
                    {district} {/* 구역명 표시 */}
                  </Link>
                </li>
            );
          })}
        </ul>
      </div>
  );
}

export default DistrictListPage;
