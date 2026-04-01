import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, ADMIN_BASE_URL } from "../config";

// 🎯 Extract YouTube ID
const getYoutubeId = (url) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
};

function Herosection() {
  const [heroCards, setHeroCards] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // 🔥 Fetch API (UNCHANGED PATH)
  useEffect(() => {
    const fetchHeroCard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/hero.php?t=${new Date().getTime()}`);
        const result = await res.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setHeroCards(result.data);

          const firstVideo = getYoutubeId(result.data[0]?.youtube_link);
          if (firstVideo) setActiveVideo(firstVideo);
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
      }
    };

    fetchHeroCard();
  }, []);

  // 🔥 Auto Slide
  useEffect(() => {
    if (heroCards.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % heroCards.length;
        const nextVideo = getYoutubeId(heroCards[next]?.youtube_link);
        if (nextVideo) setActiveVideo(nextVideo);
        return next;
      });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [heroCards]);

  // 🔥 Hover Stop
  const handleMouseEnter = () => clearInterval(intervalRef.current);

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % heroCards.length;
        const nextVideo = getYoutubeId(heroCards[next]?.youtube_link);
        if (nextVideo) setActiveVideo(nextVideo);
        return next;
      });
    }, 3000);
  };

  return (
    <section className="relative bg-black overflow-hidden pb-32">

      {/* 🔥 MAIN VIDEO BANNER */}
      <div className="absolute inset-0 z-0">
        {activeVideo && (
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&mute=1&loop=1&playlist=${activeVideo}`}
            title="Banner Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 w-[95%] mx-auto min-h-[600px] flex items-center">
        <div className="max-w-2xl text-white pl-6 md:pl-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Communities
          </h1>

          <p className="mb-6">
            Lorem ipsum dolor sit amet.
          </p>

          <Link
            to="/about"
            className="bg-green-600 px-6 py-3 rounded-full"
          >
            Learn More →
          </Link>
        </div>
      </div>

      {/* 🔥 SLIDER (API BASED) */}
      <div
        className="absolute bottom-24 left-0 w-full z-30"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 px-6 w-max">

            {heroCards.map((card, index) => {
              const vid = getYoutubeId(card.youtube_link);

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (vid) {
                      setActiveVideo(vid);
                      setCurrentIndex(index);
                    }
                  }}
                  className={`cursor-pointer flex-shrink-0 rounded-lg overflow-hidden border-2 transition 
                  ${currentIndex === index ? "border-yellow-400 scale-110" : "border-transparent"}`}
                >
                  <img
                    src={`${ADMIN_BASE_URL}${card.image_url}`}
                    alt={card.title}
                    className="w-[180px] h-[100px] object-cover"
                  />
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ✅ SVG SAME */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="w-full h-24 md:h-32 lg:h-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#F9F6EA"
            d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,229.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>

    </section>
  );
}

export default Herosection;