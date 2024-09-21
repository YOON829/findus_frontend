import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import axios from 'axios';

const PlaceReviewPage = ({ placeId }) => {
  const [newReview, setNewReview] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인 (예: 세션 체크 API 호출)
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sessionCheck', { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleReviewSubmitted = (review) => {
    setNewReview(review); // 새 리뷰가 제출되면 상태 업데이트
  };

  return (
    <div>
      <h1>Place Reviews</h1>
      <ReviewForm placeId={placeId} isLoggedIn={isLoggedIn} onReviewSubmitted={handleReviewSubmitted} />
      <ReviewList placeId={placeId} newReview={newReview} />
    </div>
  );
};

export default PlaceReviewPage;
