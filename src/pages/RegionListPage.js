import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import { getMappedValue } from '../services/mapping'; // mappings.js 파일에서 함수 가져오기

function RegionListPage() {
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 뒤로 가기 함수
  const goBack = () => {
    navigate('/search');  // '/search' 경로로 이동
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/regions')
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  return (
      <div>
        <button onClick={goBack}>뒤로 가기</button>

        <h1>지역 목록</h1>

        {regions.length === 0 ? (
            <p>지역 목록을 불러오는 중입니다...</p>
        ) : (
            <ul>
              {regions.map(region => {
                const regionKey = getMappedValue('region', region); // 한글을 영문으로 매핑
                return (
                    <li key={regionKey}>
                      <Link to={`/regions/${regionKey}`}>{region}</Link>
                    </li>
                );
              })}
            </ul>
        )}
      </div>
  );
}

export default RegionListPage;
