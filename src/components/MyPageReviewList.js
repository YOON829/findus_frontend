import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/MyPage.css";

const apiUrl = process.env.REACT_APP_API_URL;

const MyReviewList = ({ reviews, setReviews }) => {
  const [selectedReviews, setSelectedReviews] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToDetail = (placeId) => {
    navigate(`/single-marker/${placeId}`);
  };

  const handleCheckboxChange = (reviewId) => {
    setSelectedReviews((prevSelected) =>
      prevSelected.includes(reviewId)
        ? prevSelected.filter((id) => id !== reviewId)
        : [...prevSelected, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map((review) => review.review_id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const reviewId of selectedReviews) {
        await axios.delete(`https://findus-jp.link/api/reviews/${reviewId}`, {
          withCredentials: true,
        });
      }

      setReviews((prevReviews) =>
        prevReviews.filter(
          (review) => !selectedReviews.includes(review.review_id)
        )
      );
      setSelectedReviews([]);
      console.log("Selected reviews deleted successfully");
    } catch (error) {
      console.error("Error deleting reviews:", error);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return "/path/to/placeholder-image.jpg";

    // 'realPlace' 이미지를 우선적으로 찾습니다.
    const realPlaceImage = images.find(img => img.image_url.includes('realPlace'));
    if (realPlaceImage) return `https://findus-jp.link${realPlaceImage.image_url}`;

    // 'realPlace' 이미지가 없으면 'aniPlace' 이미지를 찾습니다.
    const aniPlaceImage = images.find(img => img.image_url.includes('aniPlace'));
    if (aniPlaceImage) return `https://findus-jp.link${aniPlaceImage.image_url}`;

    // 둘 다 없으면 첫 번째 이미지를 사용합니다.
    return `https://findus-jp.link${images[0].image_url}`;
  };

  return (
    <div className="review-list">
      <h3>내가 작성한 리뷰({reviews.length})</h3>
      {reviews.length > 0 ? (
        <>
          <div className="review-actions">
            <button
              className="action-button select-all"
              onClick={handleSelectAll}
            >
              {selectedReviews.length === reviews.length
                ? "전체 선택 해제"
                : "전체 선택"}
            </button>
            <button
              className="action-button delete-selected"
              onClick={handleDeleteSelected}
              disabled={selectedReviews.length === 0}
            >
              선택 삭제
            </button>
          </div>

          <ul className="review-list-box">
            {reviews.map((review) => (
              <li key={review.review_id} className="review-item">
                <div className="review-image">
                  <img
                    src={getImageUrl(review.Place.Images)}
                    alt={review.Place.place_name}
                    onError={handleImageError}
                  />
                </div>
                <div className="review-content">
                  <h4
                    onClick={() =>
                      handleNavigateToDetail(review.Place.place_id)
                    }
                  >
                    {review.Place.place_name}
                  </h4>
                  <p className="review-comment">{review.comment}</p>
                </div>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedReviews.includes(review.review_id)}
                  onChange={() => handleCheckboxChange(review.review_id)}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyReviewList;