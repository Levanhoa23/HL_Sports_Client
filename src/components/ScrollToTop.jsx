import { useState, useEffect } from "react";
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa6"; // dùng fa6 cho youtube, tiktok

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const ArrowUpIcon = () => (
    <svg
      className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );

  return (
    <>
      {isVisible && (
        <div className="fixed z-50 flex flex-col items-center gap-3 duration-300 bottom-8 right-9 animate-in fade-in slide-in-from-bottom-5">
          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-red-600 rounded-full shadow-md hover:bg-red-700 hover:scale-110"
          >
            <FaYoutube />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-black rounded-full shadow-md hover:bg-gray-900 hover:scale-110"
          >
            <FaTiktok />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-110"
          >
            <FaFacebookF />
          </a>
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 transform bg-black rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:scale-105 group"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
