import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 Link 및 navigate 훅을 가져옵니다.
import axios from 'axios';  // HTTP 요청을 위한 axios 라이브러리를 가져옵니다.





function WorkListPage() {
  const [works, setWorks] = useState([]);  // 작품 목록을 저장할 상태를 선언합니다. 초기값은 빈 배열입니다.
  const [loading, setLoading] = useState(true);  // 로딩 상태를 관리하는 상태를 선언합니다. 초기값은 true입니다.
  const [error, setError] = useState(null);  // 에러 메시지를 저장할 상태를 선언합니다.
  const navigate = useNavigate();  // 페이지 리다이렉트를 위한 훅

  const goBack = () => {
    navigate('/search');  // 검색 페이지로 이동
};



  useEffect(() => {
    // 컴포넌트가 마운트될 때 모든 작품 목록을 가져옵니다.
    axios.get('http://3.35.55.228:5000/api/work/all')  // 서버의 API 엔드포인트로부터 작품 목록을 가져옵니다.
      .then(response => {
        setWorks(response.data);  // 응답받은 데이터를 works 상태에 저장합니다.
        setLoading(false);  // 데이터 로딩이 완료되면 로딩 상태를 false로 설정합니다.
      })
      .catch(error => {
        console.error('Error fetching work details:', error);  // 요청 중 에러가 발생하면 콘솔에 에러를 출력합니다.
        if (error.response && error.response.status === 404) {
          navigate('/notfound');  // 404 에러가 발생하면 NotFoundPage로 리다이렉트합니다.
        } else {
          setError('작품 목록을 가져오는 데 실패했습니다.');  // 에러 메시지를 상태에 저장합니다.
        }
        setLoading(false);  // 에러가 발생해도 로딩 상태를 false로 설정합니다.
      });
  }, [navigate]);  // navigate 훅이 변경될 때마다 이 효과가 다시 실행됩니다.

  if (loading) return <div>로딩 중...</div>;  // 로딩 중일 때 로딩 메시지를 렌더링합니다.
  if (error) return <div>에러: {error}</div>;  // 에러가 발생하면 에러 메시지를 렌더링합니다.

  return (
      <div>
        <button onClick={goBack} style={{marginBottom: '10px', padding: '8px 16px', cursor: 'pointer'}}>
          뒤로 가기
        </button>
        <h1>작품 목록</h1>  {/* 페이지 제목을 표시합니다. */}
        <ul>
          {works.map(work => (  // works 배열을 순회하여 각 작품을 리스트 아이템으로 렌더링합니다.
              <li key={work.work_key}>  {/* 각 작품에 고유한 key 값을 설정합니다. */}
                <Link
                    to={`/work/${work.work_key}`}>{work.work_name}</Link> {/* 작품 이름을 클릭하면 해당 작품의 세부 정보 페이지로 이동하는 링크를 생성합니다. */}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default WorkListPage;
