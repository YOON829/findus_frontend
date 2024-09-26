import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const BookmarkButton = ({ placeId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://findus-jp.link/api/bookmark/check/${placeId}`,
          {
            withCredentials: true,
          }
        );
        setIsBookmarked(response.data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [placeId]);

  const handleBookmark = async () => {
    setIsLoading(true);
    try {
      if (isBookmarked) {
        await axios.delete(`https://findus-jp.link/api/bookmark/${placeId}`, {
          withCredentials: true,
        });
        message.success("북마크가 삭제되었습니다.");
      } else {
        await axios.post(
          `https://findus-jp.link/api/bookmark`,
          { place_id: placeId },
          { withCredentials: true }
        );
        message.success("북마크가 추가되었습니다.");
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      message.error("북마크 변경 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
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
      loading={isLoading}
      disabled={isLoading}
    >
      {isBookmarked ? "북마크 됨" : "북마크"}
    </Button>
  );
};

export default BookmarkButton;