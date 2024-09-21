// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // //
// // // const apiUrl = process.env.REACT_APP_API_URL;
// // //
// // // const MyPage = () => {
// // //   const [bookmarks, setBookmarks] = useState([]);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const navigate = useNavigate();
// // //
// // //   useEffect(() => {
// // //     // 로그인 상태 확인
// // //     const checkLoginStatus = async () => {
// // //       try {
// // //         const response = await axios.get(`${apiUrl}/auth/session-check`, { withCredentials: true });
// // //         if (response.data.loggedIn) {
// // //           setIsLoggedIn(true);  // 로그인된 상태
// // //         } else {
// // //           setIsLoggedIn(false);
// // //           alert('로그인이 필요합니다.');
// // //           navigate('/login');  // 로그인 페이지로 리다이렉트
// // //         }
// // //       } catch (error) {
// // //         console.error('Error checking login status:', error);
// // //         setIsLoggedIn(false);
// // //         navigate('/login');  // 에러 발생 시 로그인 페이지로 리다이렉트
// // //       }
// // //     };
// // //
// // //     checkLoginStatus();
// // //   }, [navigate]);
// // //
// // //   useEffect(() => {
// // //     if (isLoggedIn) {
// // //       // 로그인된 사용자일 경우 북마크 목록을 가져오는 API 요청
// // //       axios.get(`${apiUrl}/api/bookmark`, { withCredentials: true })  // 경로 수정
// // //         .then(response => {
// // //           setBookmarks(response.data);  // 북마크 목록 상태 업데이트
// // //         })
// // //         .catch(error => {
// // //           console.error('Error fetching bookmarks:', error);
// // //         });
// // //     }
// // //   }, [isLoggedIn]);
// // //
// // //   // 북마크 삭제 처리 함수
// // //   const handleDeleteBookmark = (bookmarkId) => {
// // //     axios.delete(`${apiUrl}/api/bookmark/${bookmarkId}`, { withCredentials: true })
// // //       .then(() => {
// // //         // 삭제된 북마크를 상태에서 제거
// // //         setBookmarks(bookmarks.filter(bookmark => bookmark.bookmark_id !== bookmarkId));
// // //         console.log('Bookmark deleted');
// // //       })
// // //       .catch(error => {
// // //         console.error('Error deleting bookmark:', error);
// // //       });
// // //   };
// // //
// // //   return (
// // //     <div>
// // //       <h2>내 북마크 목록</h2>
// // //       {bookmarks.length > 0 ? (
// // //         <ul>
// // //           {bookmarks.map(bookmark => (
// // //             <li key={bookmark.bookmark_id}>
// // //               <h3>{bookmark.Place.place_name}</h3>
// // //               <p>{bookmark.Place.description}</p>
// // //               <p>{bookmark.Place.address_city}, {bookmark.Place.address_district}</p>
// // //               <div>
// // //                 {bookmark.Place.Images && bookmark.Place.Images.length > 0 ? (
// // //                   bookmark.Place.Images.map((image, index) => (
// // //                     <img key={index} src={`${apiUrl}${image.image_url}`} alt="북마크 이미지" style={{ width: '200px', marginRight: '10px' }} />
// // //                   ))
// // //                 ) : (
// // //                   <p>이미지가 없습니다.</p>
// // //                 )}
// // //               </div>
// // //               <button onClick={() => handleDeleteBookmark(bookmark.bookmark_id)}>
// // //                 북마크 삭제
// // //               </button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       ) : (
// // //         <p>북마크한 장소가 없습니다.</p>
// // //       )}
// // //     </div>
// // //   );
// // // };
// // //
// // // export default MyPage;
// //
// //
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// //
// // const apiUrl = process.env.REACT_APP_API_URL;
// //
// // const MyPage = () => {
// //   const [bookmarks, setBookmarks] = useState([]);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();
// //
// //   useEffect(() => {
// //     // 로그인 상태 확인
// //     const checkLoginStatus = async () => {
// //       try {
// //         const response = await axios.get(`${apiUrl}/auth/session-check`, { withCredentials: true });
// //         if (response.data.loggedIn) {
// //           setIsLoggedIn(true);  // 로그인된 상태
// //         } else {
// //           setIsLoggedIn(false);
// //           alert('로그인이 필요합니다.');
// //           navigate('/login');  // 로그인 페이지로 리다이렉트
// //         }
// //       } catch (error) {
// //         console.error('Error checking login status:', error);
// //         setIsLoggedIn(false);
// //         navigate('/login');  // 에러 발생 시 로그인 페이지로 리다이렉트
// //       }
// //     };
// //
// //     checkLoginStatus();
// //   }, [navigate]);
// //
// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       // 로그인된 사용자일 경우 북마크 목록을 가져오는 API 요청
// //       axios.get(`${apiUrl}/api/bookmark`, { withCredentials: true })  // 경로 수정
// //         .then(response => {
// //           setBookmarks(response.data);  // 북마크 목록 상태 업데이트
// //         })
// //         .catch(error => {
// //           console.error('Error fetching bookmarks:', error);
// //         });
// //     }
// //   }, [isLoggedIn]);
// //
// //   // 북마크 삭제 처리 함수
// //   const handleDeleteBookmark = (bookmarkId) => {
// //     axios.delete(`${apiUrl}/api/bookmark/${bookmarkId}`, { withCredentials: true })
// //       .then(() => {
// //         // 삭제된 북마크를 상태에서 제거
// //         setBookmarks(bookmarks.filter(bookmark => bookmark.bookmark_id !== bookmarkId));
// //         console.log('Bookmark deleted');
// //       })
// //       .catch(error => {
// //         console.error('Error deleting bookmark:', error);
// //       });
// //   };
// //
// //   // 북마크 상세 페이지로 이동하는 함수
// //   const handleNavigateToDetail = (placeId) => {
// //     navigate(`/single-marker/${placeId}`);
// //   };
// //
// //   return (
// //     <div>
// //       <h2>내 북마크 목록</h2>
// //       {bookmarks.length > 0 ? (
// //         <ul>
// //           {bookmarks.map(bookmark => (
// //             <li key={bookmark.bookmark_id}>
// //               <h3
// //                 style={{ cursor: 'pointer', color: 'blue' }}  // 클릭 가능하게 스타일링
// //                 onClick={() => handleNavigateToDetail(bookmark.Place.place_id)}  // 클릭 시 상세 페이지로 이동
// //               >
// //                 {bookmark.Place.place_name}
// //               </h3>
// //               <p>{bookmark.Place.description}</p>
// //               <p>{bookmark.Place.address_city}, {bookmark.Place.address_district}</p>
// //               <div>
// //                 {bookmark.Place.Images && bookmark.Place.Images.length > 0 ? (
// //                   bookmark.Place.Images.map((image, index) => (
// //                     <img key={index} src={`${apiUrl}${image.image_url}`} alt="북마크 이미지" style={{ width: '200px', marginRight: '10px' }} />
// //                   ))
// //                 ) : (
// //                   <p>이미지가 없습니다.</p>
// //                 )}
// //               </div>
// //               <button onClick={() => handleDeleteBookmark(bookmark.bookmark_id)}>
// //                 북마크 삭제
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>북마크한 장소가 없습니다.</p>
// //       )}
// //     </div>
// //   );
// // };
// //
// // export default MyPage;
//
//
// // 즐겨찾기 갯수 추가 전
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import LoginModal from '../components/LoginModal';  // 모달 컴포넌트를 불러옵니다
//
// const apiUrl = process.env.REACT_APP_API_URL;
//
// const MyPage = () => {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 추가
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     // 로그인 상태 확인
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/auth/session-check`, { withCredentials: true });
//         if (response.data.loggedIn) {
//           setIsLoggedIn(true);  // 로그인된 상태
//         } else {
//           setIsLoggedIn(false);
//           setIsModalOpen(true);  // 로그인되지 않은 상태면 모달을 염
//         }
//       } catch (error) {
//         console.error('Error checking login status:', error);
//         setIsLoggedIn(false);
//         setIsModalOpen(true);  // 에러 발생 시에도 모달을 염
//       }
//     };
//
//     checkLoginStatus();
//   }, [navigate]);
//
//   useEffect(() => {
//     if (isLoggedIn) {
//       // 로그인된 사용자일 경우 북마크 목록을 가져오는 API 요청
//       axios.get(`${apiUrl}/api/bookmark`, { withCredentials: true })  // 경로 수정
//         .then(response => {
//           setBookmarks(response.data);  // 북마크 목록 상태 업데이트
//         })
//         .catch(error => {
//           console.error('Error fetching bookmarks:', error);
//         });
//     }
//   }, [isLoggedIn]);
//
//   // 북마크 삭제 처리 함수
//   const handleDeleteBookmark = (bookmarkId) => {
//     axios.delete(`${apiUrl}/api/bookmark/${bookmarkId}`, { withCredentials: true })
//       .then(() => {
//         // 삭제된 북마크를 상태에서 제거
//         setBookmarks(bookmarks.filter(bookmark => bookmark.bookmark_id !== bookmarkId));
//         console.log('Bookmark deleted');
//       })
//       .catch(error => {
//         console.error('Error deleting bookmark:', error);
//       });
//   };
//
//   // 북마크 상세 페이지로 이동하는 함수
//   const handleNavigateToDetail = (placeId) => {
//     navigate(`/single-marker/${placeId}`);
//   };
//
//   return (
//     <div>
//       <h2>내 북마크 목록</h2>
//       {bookmarks.length > 0 ? (
//         <ul>
//           {bookmarks.map(bookmark => (
//             <li key={bookmark.bookmark_id}>
//               <h3
//                 style={{ cursor: 'pointer', color: 'blue' }}  // 클릭 가능하게 스타일링
//                 onClick={() => handleNavigateToDetail(bookmark.Place.place_id)}  // 클릭 시 상세 페이지로 이동
//               >
//                 {bookmark.Place.place_name}
//               </h3>
//               <p>{bookmark.Place.description}</p>
//               <p>{bookmark.Place.address_city}, {bookmark.Place.address_district}</p>
//               <div>
//                 {bookmark.Place.Images && bookmark.Place.Images.length > 0 ? (
//                   bookmark.Place.Images.map((image, index) => (
//                     <img key={index} src={`${apiUrl}${image.image_url}`} alt="북마크 이미지" style={{ width: '200px', marginRight: '10px' }} />
//                   ))
//                 ) : (
//                   <p>이미지가 없습니다.</p>
//                 )}
//               </div>
//               <button onClick={() => handleDeleteBookmark(bookmark.bookmark_id)}>
//                 북마크 삭제
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>북마크한 장소가 없습니다.</p>
//       )}
//
//       {/* 로그인 모달 컴포넌트 */}
//       <LoginModal
//         isOpen={isModalOpen}  // 모달이 열려 있는지 여부
//         onRequestClose={() => setIsModalOpen(false)}  // 모달 닫기 핸들러
//       />
//     </div>
//   );
// };
//
// export default MyPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LoginModal from "../components/LoginModal"; // 모달 컴포넌트를 불러옵니다
// import "../css/MyPage.css";

// const apiUrl = process.env.REACT_APP_API_URL;

// const MyPage = () => {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 로그인 상태 확인
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/auth/session-check`, {
//           withCredentials: true,
//         });
//         if (response.data.loggedIn) {
//           setIsLoggedIn(true); // 로그인된 상태
//         } else {
//           setIsLoggedIn(false);
//           setIsModalOpen(true); // 로그인되지 않은 상태면 모달을 염
//         }
//       } catch (error) {
//         console.error("Error checking login status:", error);
//         setIsLoggedIn(false);
//         setIsModalOpen(true); // 에러 발생 시에도 모달을 염
//       }
//     };

//     checkLoginStatus();
//   }, [navigate]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       // 로그인된 사용자일 경우 북마크 목록을 가져오는 API 요청
//       axios
//         .get(`${apiUrl}/api/bookmark`, { withCredentials: true }) // 경로 수정
//         .then((response) => {
//           setBookmarks(response.data); // 북마크 목록 상태 업데이트
//         })
//         .catch((error) => {
//           console.error("Error fetching bookmarks:", error);
//         });
//     }
//   }, [isLoggedIn]);

//   // 북마크 삭제 처리 함수
//   const handleDeleteBookmark = (bookmarkId) => {
//     axios
//       .delete(`${apiUrl}/api/bookmark/${bookmarkId}`, { withCredentials: true })
//       .then(() => {
//         // 삭제된 북마크를 상태에서 제거
//         setBookmarks(
//           bookmarks.filter((bookmark) => bookmark.bookmark_id !== bookmarkId)
//         );
//         console.log("Bookmark deleted");
//       })
//       .catch((error) => {
//         console.error("Error deleting bookmark:", error);
//       });
//   };

//   // 북마크 상세 페이지로 이동하는 함수
//   const handleNavigateToDetail = (placeId) => {
//     navigate(`/single-marker/${placeId}`);
//   };

//   // 뒤로가기 함수
//   const handleGoBack = () => {
//     navigate(-1); // 이전 페이지로 이동
//   };

//   return (
//     <div>
//       <h2>내 북마크 목록</h2>

//       {/* 즐겨찾기한 갯수 표시 */}
//       <p>즐겨찾기한 장소 개수: {bookmarks.length}개</p>

//       {/* 뒤로가기 버튼 */}
//       <button onClick={handleGoBack} style={{ marginBottom: "20px" }}>
//         뒤로가기
//       </button>

//       {bookmarks.length > 0 ? (
//         <ul>
//           {bookmarks.map((bookmark) => (
//             <li key={bookmark.bookmark_id}>
//               <h3
//                 style={{ cursor: "pointer", color: "blue" }} // 클릭 가능하게 스타일링
//                 onClick={() => handleNavigateToDetail(bookmark.Place.place_id)} // 클릭 시 상세 페이지로 이동
//               >
//                 {bookmark.Place.place_name}
//               </h3>
//               <p>{bookmark.Place.description}</p>
//               <p>
//                 {bookmark.Place.address_city}, {bookmark.Place.address_district}
//               </p>
//               <div>
//                 {bookmark.Place.Images && bookmark.Place.Images.length > 0 ? (
//                   bookmark.Place.Images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`${apiUrl}${image.image_url}`}
//                       alt="북마크 이미지"
//                       style={{ width: "200px", marginRight: "10px" }}
//                     />
//                   ))
//                 ) : (
//                   <p>이미지가 없습니다.</p>
//                 )}
//               </div>
//               <button
//                 onClick={() => handleDeleteBookmark(bookmark.bookmark_id)}
//               >
//                 북마크 삭제
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>북마크한 장소가 없습니다.</p>
//       )}

//       {/* 로그인 모달 컴포넌트 */}
//       <LoginModal
//         isOpen={isModalOpen} // 모달이 열려 있는지 여부
//         onRequestClose={() => setIsModalOpen(false)} // 모달 닫기 핸들러
//       />
//     </div>
//   );
// };

// export default MyPage;
// src/pages/MyPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import "../css/MyPage.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useAuth } from "../context/AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

const MyPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookmarks();
    } else {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/bookmark`, {
        withCredentials: true,
      });
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      const placeId = bookmarks.find(
        (bookmark) => bookmark.bookmark_id === bookmarkId
      )?.Place.place_id;

      if (!placeId) {
        console.error("Place ID not found for bookmark:", bookmarkId);
        return;
      }

      console.log(`Attempting to delete bookmark for place ID: ${placeId}`);

      const response = await axios.delete(`${apiUrl}/api/bookmark/${placeId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setBookmarks((prevBookmarks) =>
          prevBookmarks.filter(
            (bookmark) => bookmark.bookmark_id !== bookmarkId
          )
        );
        console.log("Bookmark deleted successfully");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error.response || error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleNavigateToDetail = (placeId) => {
    navigate(`/single-marker/${placeId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";
  };

  return (
    <div className="my-page">
      {isLoggedIn ? (
        <>
          <h2>{user?.user_name}님의 마이페이지</h2>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{bookmarks.length}</span>
              <span className="stat-label">북마크</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">인터렉션</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">새 루트제안</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">리뷰</span>
            </div>
          </div>

          <div className="bookmark-list">
            <h3>내가 북마크한 로케이션({bookmarks.length})</h3>
            {bookmarks.length > 0 ? (
              <ul className="bookmark-list-box">
                {bookmarks.map((bookmark) => (
                  <li key={bookmark.bookmark_id} className="bookmark-item">
                    <div className="bookmark-image">
                      <img
                        src={
                          bookmark.Place.Images &&
                          bookmark.Place.Images.length > 0
                            ? `${apiUrl}${bookmark.Place.Images[0].image_url}`
                            : "/path/to/placeholder-image.jpg"
                        }
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
                    <button
                      onClick={() => handleDeleteBookmark(bookmark.bookmark_id)}
                      className="delete-button"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>북마크한 장소가 없습니다.</p>
            )}
          </div>
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
