import Logo from "../logo/Logo";
import NavLinksAyush from "./NavLinksAyush";
import CloseButton from "./CloseButton";
import { FaDirections, FaPhone, FaWhatsapp } from "react-icons/fa";

function MobileNavAyush({ isNavOpen, onToggleNav }) {
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/918446915179?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20equipment%20catalog.",
      "_blank"
    );
  };

  return (
    <nav
      className={`fixed top-0 z-[100] flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-600 transition-all duration-500 ${
        isNavOpen ? "left-0" : "left-[-100%]"
      }`}
    >
      <CloseButton onClick={onToggleNav} />

      <Logo />

      <NavLinksAyush
        onToggleNav={onToggleNav}
        styles="flex flex-col gap-5 text-2xl font-bold text-white"
      />
      
      {/* Contact Buttons */}
      <div className="flex flex-col gap-4 mt-6">
        <a
          href="https://share.google/vkzLx1uui7kpivrtQ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white hover:text-red transition-colors"
        >
          <FaDirections className="w-5 h-5" />
          Get Directions
        </a>
        <a
          href="tel:+918446915179"
          className="flex items-center gap-3 text-white hover:text-red transition-colors"
        >
          <FaPhone className="w-5 h-5" />
          +91 8446915179
        </a>
        
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaWhatsapp className="w-5 h-5" />
          Chat on WhatsApp
        </button>
      </div>
    </nav>
  );
}

export default MobileNavAyush;
