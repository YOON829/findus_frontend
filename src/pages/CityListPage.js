import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import { getMappedValue } from '../services/mapping'; // 매핑 함수 가져오기

function CityListPage() {
  const { regionKey } = useParams();  // URL에서 regionKey를 추출
  const [data, setData] = useState({ region: '', cities: [] });  // 지역과 도시 데이터
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions`);  // 'regions' 경로로 이동
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/regions/${regionKey}`)  // API 요청
      .then(response => {
        setData(response.data);  // 지역과 도시 목록을 상태에 저장
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching city details:', error);
        setLoading(false);
      });
  }, [regionKey]);

  if (loading) {
    return <p>Loading city details...</p>;
  }

  if (data.cities.length === 0) {
    return <p>No cities available for this region.</p>;
  }

  return (
      <div>
          <button onClick={goBack}>뒤로 가기</button>

          <h1>{data.region} 지역의 도시 목록</h1>  {/* API로부터 받은 지역명 표시 */}

          <ul>
              {data.cities.map((city, index) => {
                  const cityKey = getMappedValue('city', city);  // 도시명을 영문으로 매핑
                  return (
                      <li key={index}>
                          <Link to={`/regions/${regionKey}/${cityKey}`}>
                              {city} {/* 도시 이름 출력 */}
                          </Link>
                      </li>
                  );
              })}
          </ul>
      </div>
  );
}

export default CityListPage;
