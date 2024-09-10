import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1);  // -1은 이전 페이지로 이동하는 것을 의미합니다.
  };

  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>찾으시는 페이지가 존재하지 않습니다.</p>
      <button onClick={goBack}>이전 페이지로 돌아가기</button>  {/* 뒤로 가기 버튼 */}
    </div>
  );
}

export default NotFoundPage;
