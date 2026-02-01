import { Link } from "react-router-dom";
import logoImg from "../../assets/final_logo.png";

function Logo({ size = "w-full", type = "white" }) {
  return (
    <Link to="/" className="focus inline-block">
      <div className="flex items-center gap-2">
        <span className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
          <img
            src={logoImg}
            alt="Ayush Sports logo"
            className="h-full w-full object-contain"
            loading="eager"
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
