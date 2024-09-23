import React, { useState, useEffect } from "react";
import "../css/ScrollToTopButton.css"; // 별도의 CSS 파일 생성

function ScrollToTopButton() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      if (scrollPercentage > 30) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // 페이지 맨 위로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScrollTopButton && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span className="material-symbols-outlined">vertical_align_top</span>
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
