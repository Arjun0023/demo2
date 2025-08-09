import Logo from "../logo/Logo";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function FooterAyush() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/#products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const productCategories = [
    "Dumbbells",
    "Treadmills",
    "Benches",
    "Barbells",
    "Resistance Bands",
    "Accessories",
  ];

  return (
    <footer className="bg-gray-600 px-4 sm:px-6 py-12 sm:py-16 text-white">
      <div className="container grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div className="space-y-6">
          <Logo />
          <p className="text-gray-100">
            Premium gym equipment supplier serving fitness enthusiasts and commercial gyms since 2015.
          </p>
          <SocialLinks />
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} Ayush Enterprise. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-xl font-bold">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-100 hover:text-red transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h3 className="mb-6 text-xl font-bold">Our Products</h3>
          <ul className="space-y-3">
            {productCategories.map((category) => (
              <li key={category}>
                <a
                  href={`/#products`}
                  className="text-gray-100 hover:text-red transition-colors duration-300"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-6 text-xl font-bold">Contact Us</h3>
          <div className="space-y-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 text-gray-100 hover:text-red transition-colors"
            >
              <FaPhone className="text-red" />
              +91-98765-43210
            </a>
            <a
              href="mailto:info@ayushenterprise.com"
              className="flex items-center gap-3 text-gray-100 hover:text-red transition-colors"
            >
              <FaEnvelope className="text-red" />
              info@ayushenterprise.com
            </a>
            <div className="flex items-start gap-3 text-gray-100">
              <FaMapMarkerAlt className="text-red mt-1 flex-shrink-0" />
              <address className="not-italic">
                123, Fitness Avenue,<br />
                Near Sports Complex,<br />
                New Delhi - 110001
              </address>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-400">
              <p className="text-sm text-gray-200">
                <span className="font-semibold">Store Hours:</span><br />
                Mon-Sat: 10:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterAyush;
