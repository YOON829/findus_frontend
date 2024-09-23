import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const apiUrl = process.env.REACT_APP_API_URL;

const BookmarkButton = ({ placeId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/bookmark/check/${placeId}`,
          {
            withCredentials: true,
          }
        );
        setIsBookmarked(response.data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [placeId]);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.delete(`${apiUrl}/api/bookmark/${placeId}`, {
          withCredentials: true,
        });
        console.log("Bookmark deleted");
      } else {
        await axios.post(
          `${apiUrl}/api/bookmark`,
          { place_id: placeId },
          { withCredentials: true }
        );
        console.log("Bookmark added");
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // 에러 발생 시 상태를 원래대로 되돌립니다.
      setIsBookmarked(isBookmarked);
    }
  };

  return (
    <Button
      className={`icon-button ${isBookmarked ? "bookmarked" : "default"}`}
      icon={
        isBookmarked ? (
          <StarFilled className="bookmark-icon" />
        ) : (
          <StarOutlined className="bookmark-icon" />
        )
      }
      onClick={handleBookmark}
      style={{ color: isBookmarked ? "gold" : undefined }}
    >
      {isBookmarked ? "북마크 됨" : "북마크"}
    </Button>
  );
};

export default BookmarkButton;
