import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const handleClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20equipment%20catalog.",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400/50 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden sm:block">
        Chat with us on WhatsApp
      </span>
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-30"></span>
    </button>
  );
}

export default WhatsAppButton;
