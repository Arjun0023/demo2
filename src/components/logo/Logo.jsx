import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

function Logo({ size = "w-full", type = "white" }) {
  return (
    <Link to="/" className="focus inline-block">
      <div className="flex items-center gap-2">
        <FaDumbbell className={`h-6 w-6 sm:h-8 sm:w-8 ${type === "black" ? "text-gray-600" : "text-white"}`} />
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold leading-tight ${type === "black" ? "text-gray-600" : "text-white"}`}>
            AYUSH
          </h2>
          <p className={`text-[10px] sm:text-xs font-medium -mt-1 ${type === "black" ? "text-gray-400" : "text-gray-200"}`}>
            ENTERPRISE
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
