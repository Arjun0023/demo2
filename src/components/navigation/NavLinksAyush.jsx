import { Link } from "react-router-dom";

const linkStyles = "hover:text-red focus:text-red focus";

function NavLinksAyush({ onToggleNav, styles }) {
  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
    if (onToggleNav) onToggleNav();
  };

  return (
    <ul className={styles}>
      <li>
        <Link to="/" className={linkStyles} onClick={onToggleNav}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/shop" className={linkStyles} onClick={onToggleNav}>
          Shop
        </Link>
      </li>
      <li>
        <Link to="/search" className={linkStyles} onClick={onToggleNav}>
          Search
        </Link>
      </li>
      <li>
        <Link to="/about" className={linkStyles} onClick={onToggleNav}>
          About
        </Link>
      </li>
      <li>
        <Link to="/contact" className={linkStyles} onClick={onToggleNav}>
          Contact
        </Link>
      </li>
      <li>
        <Link to="/admin" className={linkStyles} onClick={onToggleNav}>
          Admin
        </Link>
      </li>
    </ul>
  );
}

export default NavLinksAyush;
