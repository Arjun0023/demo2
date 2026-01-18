import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SecondaryHeading from "../headings/SecondaryHeading";
import PrimaryHeading from "../headings/PrimaryHeading";
import { FaWhatsapp } from "react-icons/fa";

// heroBg import removed as we are using dynamic imports now

function HeroAyush() {
  const navigate = useNavigate();
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/918446915179?text=Hi%2C%20I%27m%20interested%20in%20your%20turf%20flooring%20solutions.",
      "_blank"
    );
  };

  const goToShop = () => {
    navigate("/shop");
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamically import all images from the hero assets folder
  const heroImages = Object.values(
    import.meta.glob("../../assets/hero/*.{png,jpg,jpeg,webp}", {
      eager: true,
      as: "url",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative z-[2] mt-[-93px] flex min-h-[100dvh] items-center bg-black text-center xl:text-left">
      {/* Background Image Slideshow with semi-transparent overlay */}
      {/* Background Image Slideshow with semi-transparent overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"></div>
        {heroImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Football Turf Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover brightness-90 contrast-110 saturate-150 transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20 z-20">
        <div className="flex h-full items-center justify-center xl:justify-end">
          <div className="relative z-10 w-full max-w-4xl">
            <div className="space-y-6 sm:space-y-8 drop-shadow-xl">
              {/* Secondary heading with red accent */}
              <div className="inline-block">
                <div className="bg-red px-6 py-2 sm:px-8 sm:py-3">
                  <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Premuim Sports Flooring Solutions
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Ayush Sports
                </h1>
                <p className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Design Your Sports Arena
                </p>
                <p className="text-lg sm:text-xl lg:text-3xl font-semibold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  World-Class Football Courts, Turfs & Gym Flooring
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start pt-4">
                <button
                  onClick={goToShop}
                  className="focus relative inline-flex items-center justify-center gap-1.5 bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase text-gray-600 before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] before:border-gray-400/50"
                >
                  Explore Catalog
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="focus relative inline-flex items-center justify-center gap-2 bg-green-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase text-white shadow-lg before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border-2 before:border-solid before:transition-all before:duration-500 before:translate-x-[-12px] before:translate-y-[12px] hover:before:translate-x-0 hover:before:translate-y-0 before:border-green-400/50"
                >
                  <FaWhatsapp className="h-auto w-4 !text-green-200" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroAyush;
