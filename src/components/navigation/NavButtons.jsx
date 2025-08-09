import { Link } from "react-router-dom";
import { FaBars, FaRegUser, FaChartBar } from "react-icons/fa6";
import { FaDirections } from "react-icons/fa";

const btnStyles = `hover:text-red text-white transition-colors duration-300 focus`;

function NavButtons({ onToggleNav, onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between gap-7">
      <button className={`3xl:hidden ${btnStyles}`} onClick={onToggleNav}>
        <FaBars className="h-6 w-6" />
      </button>
      <Link to="/" className={btnStyles}>
        <FaRegUser className="h-6 w-6" />
      </Link>
      <button className={btnStyles}>
        <FaChartBar className="h-6 w-6" onClick={onToggleSidebar} />
      </button>
      <div className="focus hidden rounded-sm border-2 border-solid border-gray-350 p-1.5 lg:block">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=28.6139,77.2090&travelmode=driving"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 flex items-center justify-between gap-2 text-sm font-bold uppercase text-white outline-none"
        >
          <FaDirections className="h-8 w-8 rounded-sm bg-red p-2 text-white transition-transform duration-300 hover:scale-110" />
          Get Directions
        </a>
      </div>
    </div>
  );
}

export default NavButtons;
