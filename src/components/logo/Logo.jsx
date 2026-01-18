import { Link } from "react-router-dom";
import { FaBasketballBall, FaFutbol } from "react-icons/fa";
import { GiShuttlecock } from "react-icons/gi";

function Logo({ size = "w-full", type = "white" }) {
  return (
    <Link to="/" className="focus inline-block">
      <div className="flex items-center gap-2">
        <span className="relative flex h-9 w-9 items-center justify-center sm:h-11 sm:w-11">
          <span
            className={`absolute inset-0 rounded-md border-2 ${type === "black" ? "border-gray-600/70" : "border-white/60"}`}
          />
          <span
            className={`absolute inset-1 rounded-sm border ${type === "black" ? "border-gray-600/50" : "border-white/40"}`}
          />
          <span
            className={`absolute left-1/2 top-1 h-5 w-px -translate-x-1/2 ${type === "black" ? "bg-gray-600/50" : "bg-white/40"}`}
          />
          <span
            className={`absolute left-1/2 bottom-1 h-5 w-px -translate-x-1/2 ${type === "black" ? "bg-gray-600/50" : "bg-white/40"}`}
          />
          <FaFutbol
            className={`absolute left-0 top-0 h-4 w-4 sm:h-5 sm:w-5 ${type === "black" ? "text-gray-600" : "text-white"}`}
          />
          <GiShuttlecock
            className={`absolute right-0 top-1 h-4 w-4 sm:h-5 sm:w-5 ${type === "black" ? "text-gray-600/90" : "text-white/90"}`}
          />
          <FaBasketballBall
            className={`absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 sm:h-5 sm:w-5 ${type === "black" ? "text-gray-600/80" : "text-white/80"}`}
          />
        </span>
        <div className="flex flex-col">
          <h2 className={`w-[6ch] text-center text-xl sm:text-2xl font-bold leading-tight ${type === "black" ? "text-gray-600" : "text-white"}`}>
            AYUSH
          </h2>
          <p className={`w-[6ch] text-center text-[12px] sm:text-[16px] font-medium -mt-1 ml-3.5 ${type === "black" ? "text-gray-400" : "text-gray-200"}`}>
            SPORTS
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
