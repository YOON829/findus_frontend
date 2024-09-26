import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import "../css/MyPage.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useAuth } from "../context/AuthContext";
import MyReviewList from '../components/MyPageReviewList';

const apiUrl = process.env.REACT_APP_API_URL;

const MyPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState('bookmarks');
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookmarks();
      fetchReviews();
    } else {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`https://findus-jp.link/api/bookmark`, {
        withCredentials: true,
      });
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://findus-jp.link/api/reviews`, {
        withCredentials: true,
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDeleteBookmarks = async () => {
    try {
      for (const bookmarkId of selectedBookmarks) {
        const placeId = bookmarks.find(
          (bookmark) => bookmark.bookmark_id === bookmarkId
        )?.Place.place_id;

        if (!placeId) {
          console.error("Place ID not found for bookmark:", bookmarkId);
          continue;
        }

        await axios.delete(`https://findus-jp.link/api/bookmark/${placeId}`, {
          withCredentials: true,
        });
      }

      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter(
          (bookmark) => !selectedBookmarks.includes(bookmark.bookmark_id)
        )
      );
      setSelectedBookmarks([]);
      console.log("Selected bookmarks deleted successfully");
    } catch (error) {
      console.error("Error deleting bookmarks:", error);
    }
  };

  const handleNavigateToDetail = (placeId) => {
    navigate(`/single-marker/${placeId}`);
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return "/path/to/placeholder-image.jpg";

    const imageTypes = ['realPlace', 'aniPlace', 'userUpload'];
    for (const type of imageTypes) {
      const image = images.find(img => img.image_url.includes(type));
      if (image) return `https://findus-jp.link/${image.image_url}`;
    }

    return `https://findus-jp.link/${images[0].image_url}`;
  };

  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";
  };

  const handleCheckboxChange = (bookmarkId) => {
    setSelectedBookmarks((prevSelected) =>
      prevSelected.includes(bookmarkId)
        ? prevSelected.filter((id) => id !== bookmarkId)
        : [...prevSelected, bookmarkId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookmarks.length === bookmarks.length) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(bookmarks.map((bookmark) => bookmark.bookmark_id));
    }
  };

  const renderContent = () => {
    if (activeTab === 'bookmarks') {
      return (
        <div className="bookmark-list">
          <h3>내가 북마크한 로케이션({bookmarks.length})</h3>
          {bookmarks.length > 0 ? (
            <>
              <div className="bookmark-actions">
                <button
                  className="action-button select-all"
                  onClick={handleSelectAll}
                >
                  {selectedBookmarks.length === bookmarks.length
                    ? "전체 선택 해제"
                    : "전체 선택"}
                </button>
                <button
                  className="action-button delete-selected"
                  onClick={handleDeleteBookmarks}
                  disabled={selectedBookmarks.length === 0}
                >
                  선택 삭제
                </button>
              </div>

              <ul className="bookmark-list-box">
                {bookmarks.map((bookmark) => (
                  <li key={bookmark.bookmark_id} className="bookmark-item">
                    <div className="bookmark-image">
                      <img
                        src={getImageUrl(bookmark.Place.Images)}
                        alt={bookmark.Place.place_name}
                        onError={handleImageError}
                      />
                    </div>
                    <div className="bookmark-content">
                      <h4
                        onClick={() =>
                          handleNavigateToDetail(bookmark.Place.place_id)
                        }
                      >
                        {bookmark.Place.place_name}
                      </h4>
                      <p>{bookmark.Place.description}</p>
                    </div>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={selectedBookmarks.includes(
                        bookmark.bookmark_id
                      )}
                      onChange={() =>
                        handleCheckboxChange(bookmark.bookmark_id)
                      }
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>북마크한 장소가 없습니다.</p>
          )}
        </div>
      );
    } else if (activeTab === 'reviews') {
      return <MyReviewList reviews={reviews} setReviews={setReviews} />;
    }
  };

  return (
    <div className="my-page">
      {isLoggedIn ? (
        <>
          <h2>{user?.user_name}님의 마이페이지</h2>
          <div className="stats">
            <div
              className={`stat-item ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              <span className="stat-number">{bookmarks.length}</span>
              <span className="stat-label">북마크</span>
            </div>
            <div
              className={`stat-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <span className="stat-number">{reviews.length}</span>
              <span className="stat-label">리뷰</span>
            </div>
          </div>
          {renderContent()}
        </>
      ) : (
        <LoginModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default MyPage;