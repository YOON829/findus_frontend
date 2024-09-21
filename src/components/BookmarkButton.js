// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const apiUrl = process.env.REACT_APP_API_URL;
//
// const BookmarkButton = ({ placeId }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkId, setBookmarkId] = useState(null);  // 북마크 ID 상태 추가
//
//   useEffect(() => {
//     // 마운트 시 북마크 상태를 가져오는 API 요청 (사용자의 기존 북마크 확인)
//     axios.get(`${apiUrl}/api/bookmarks`, { withCredentials: true })
//       .then(response => {
//         const bookmark = response.data.find(bookmark => bookmark.place_id === placeId);
//         if (bookmark) {
//           setIsBookmarked(true);
//           setBookmarkId(bookmark.bookmark_id);  // 북마크 ID 저장
//         } else {
//           setIsBookmarked(false);
//           setBookmarkId(null);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching bookmarks:', error);
//       });
//   }, [placeId]);
//
//   const handleBookmarkClick = () => {
//     if (isBookmarked) {
//       // 이미 북마크된 상태이므로 중복 요청을 방지
//       console.log('Already bookmarked');
//       return;
//     }
//
//     // 북마크 추가 요청
//     axios.post(`${apiUrl}/api/bookmark`, { place_id: placeId }, { withCredentials: true })
//       .then(response => {
//         setIsBookmarked(true);
//         setBookmarkId(response.data.bookmark_id);  // 새로 생성된 북마크 ID 저장
//         console.log('Bookmark added');
//       })
//       .catch(error => {
//         if (error.response && error.response.status === 400) {
//           alert('이미 추가된 장소입니다.');
//         } else {
//           console.error('Error adding bookmark:', error);
//         }
//       });
//   };
//
//   return (
//     <button onClick={handleBookmarkClick}>
//       {isBookmarked ? '즐겨찾기 취소' : '즐겨찾기'}
//     </button>
//   );
// };
//
// export default BookmarkButton;
//

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/BookmarkButton.css";

// const apiUrl = process.env.REACT_APP_API_URL;

// const BookmarkButton = ({ placeId }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkId, setBookmarkId] = useState(null); // 북마크 ID 상태 추가

//   // 로그인 상태와 북마크 상태를 체크
//   useEffect(() => {
//     // 로그인 상태 확인
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/auth/session-check`, {
//           withCredentials: true,
//         });
//         if (response.data.loggedIn) {
//           setIsLoggedIn(true);
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.error("Error checking login status:", error);
//         setIsLoggedIn(false);
//       }
//     };

//     // 북마크 상태 확인
//     const checkBookmarkStatus = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/bookmarks`, {
//           withCredentials: true,
//         });
//         const bookmark = response.data.find(
//           (bookmark) => bookmark.place_id === placeId
//         );
//         if (bookmark) {
//           setIsBookmarked(true);
//           setBookmarkId(bookmark.bookmark_id); // 북마크 ID 저장
//         } else {
//           setIsBookmarked(false);
//           setBookmarkId(null);
//         }
//       } catch (error) {
//         console.error("Error fetching bookmarks:", error);
//       }
//     };

//     checkLoginStatus();
//     if (isLoggedIn) {
//       checkBookmarkStatus();
//     }
//   }, [placeId, isLoggedIn]);

//   const handleBookmarkClick = () => {
//     if (!isLoggedIn) {
//       alert("로그인이 필요합니다."); // 로그인 필요 경고창
//       return;
//     }

//     if (isBookmarked) {
//       // 이미 북마크된 상태이므로 중복 요청을 방지
//       console.log("Already bookmarked");
//       return;
//     }

//     // 북마크 추가 요청
//     axios
//       .post(
//         `${apiUrl}/api/bookmark`,
//         { place_id: placeId },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         setIsBookmarked(true);
//         setBookmarkId(response.data.bookmark_id); // 새로 생성된 북마크 ID 저장
//         console.log("Bookmark added");
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 400) {
//           alert("이미 추가된 장소입니다.");
//         } else {
//           console.error("Error adding bookmark:", error);
//         }
//       });
//   };

//   return (
//     <button onClick={handleBookmarkClick} className="icon-button">
//       <span
//         className={`material-icons bookmark-icon ${
//           isBookmarked ? "bookmarked" : "default"
//         }`}
//       >
//         bookmark
//       </span>
//     </button>
//   );
// };

// export default BookmarkButton;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/BookmarkButton.css";

// const apiUrl = process.env.REACT_APP_API_URL;

// const BookmarkButton = ({ placeId }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [bookmarkId, setBookmarkId] = useState(null);

//   const checkLoginStatus = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/auth/session-check`, {
//         withCredentials: true,
//       });
//       setIsLoggedIn(response.data.loggedIn);
//       return response.data.loggedIn;
//     } catch (error) {
//       console.error("Error checking login status:", error);
//       setIsLoggedIn(false);
//       return false;
//     }
//   };

//   const checkBookmarkStatus = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/bookmarks`, {
//         withCredentials: true,
//       });
//       const bookmark = response.data.find(
//         (bookmark) => bookmark.place_id === placeId
//       );
//       setIsBookmarked(!!bookmark);
//       setBookmarkId(bookmark ? bookmark.bookmark_id : null);
//     } catch (error) {
//       console.error("Error fetching bookmarks:", error);
//     }
//   };

//   useEffect(() => {
//     const initializeState = async () => {
//       const loggedIn = await checkLoginStatus();
//       if (loggedIn) {
//         await checkBookmarkStatus();
//       }
//     };
//     initializeState();
//   }, [placeId]);

//   const handleBookmarkClick = async () => {
//     if (!isLoggedIn) {
//       alert("로그인이 필요합니다.");
//       return;
//     }

//     try {
//       if (isBookmarked) {
//         await axios.delete(`${apiUrl}/api/bookmark/${bookmarkId}`, {
//           withCredentials: true,
//         });
//         setIsBookmarked(false);
//         setBookmarkId(null);
//         console.log("Bookmark removed");
//       } else {
//         const response = await axios.post(
//           `${apiUrl}/api/bookmark`,
//           { place_id: placeId },
//           { withCredentials: true }
//         );
//         setIsBookmarked(true);
//         setBookmarkId(response.data.bookmark_id);
//         console.log("Bookmark added");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert("이미 추가된 장소입니다.");
//       } else {
//         console.error("Error handling bookmark:", error);
//       }
//     }
//   };

//   return (
//     <button onClick={handleBookmarkClick} className="icon-button">
//       <span
//         className={`material-icons bookmark-icon ${
//           isBookmarked ? "bookmarked" : "default"
//         }`}
//       >
//         bookmark
//       </span>
//     </button>
//   );
// };

// export default BookmarkButton;import React, { useState, useEffect } from "react";

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
