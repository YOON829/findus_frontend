import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SeasonListPage() {
  const { workKey } = useParams();  // URL에서 workKey를 추출합니다.
  const [workDetails, setWorkDetails] = useState(null);  // 작품 세부 정보를 저장할 상태를 선언합니다.
  const [loading, setLoading] = useState(true);  // 로딩 상태를 관리하는 상태를 선언합니다.
  const navigate = useNavigate();  // 페이지 리다이렉트를 위한 훅

  // 뒤로 가기 함수
  const goBack = () => {
    navigate('/work');  // '/work' 경로로 이동하여 이전 페이지로 돌아갑니다.
  };

  useEffect(() => {
    setLoading(true);  // 데이터 요청을 시작할 때 로딩 상태를 true로 설정합니다.
    axios.get(`http://localhost:5000/api/work/${workKey}`)  // 주어진 workKey를 사용하여 API에서 작품 정보를 가져옵니다.
      .then(response => {
        setWorkDetails(response.data);  // 가져온 데이터를 상태로 저장합니다.
        setLoading(false);  // 데이터 요청이 완료되면 로딩 상태를 false로 설정합니다.
      })
      .catch(error => {
        console.error('Error fetching work details:', error);  // 요청 중 에러가 발생하면 콘솔에 에러를 출력합니다.
        if (error.response && error.response.status === 404) {
          navigate('/notfound');  // 404 에러가 발생하면 NotFoundPage로 리다이렉트합니다.
        }
        setLoading(false);  // 에러가 발생해도 로딩 상태를 false로 설정합니다.
      });
  }, [workKey, navigate]);  // workKey나 navigate가 변경될 때마다 이 효과가 다시 실행됩니다.

  if (loading) return <div>로딩 중...</div>;  // 로딩 중일 때 로딩 메시지를 렌더링합니다.

  // workDetails가 존재할 때만 데이터를 렌더링
  return (
    <div>
     <button onClick={goBack}>뒤로 가기</button>  {/* 뒤로 가기 버튼 */}
      <h2>시즌 목록</h2>
      <ul>
        {workDetails?.seasons.map(season => (  // seasons 배열을 순회하며 시즌 정보를 렌더링합니다.
          <li key={season.season_key}>
            {/* 시즌 클릭 시 해당 시즌의 세부 정보 페이지로 이동하는 링크를 생성합니다. */}
            <Link to={`/work/${workKey}/${season.season_key}`}>
              {season.display_name}  {/* 시즌의 이름을 표시합니다. */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeasonListPage;