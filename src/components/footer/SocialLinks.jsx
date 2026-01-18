import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const linkStyles = `focus rounded-full bg-gray-50 p-4 text-gray-400 hover:bg-red hover:text-white`;

function SocialLinks() {
  return (
    <ul className="flex gap-2">
      <Link className={linkStyles}>
        <FaFacebookF />
      </Link>
      <Link className={linkStyles}>
        <FaInstagram />
      </Link>
      <Link className={linkStyles}>
        <FaWhatsapp />
      </Link>
    </ul>
  );
}

export default SocialLinks;
