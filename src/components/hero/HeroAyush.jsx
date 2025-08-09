import SecondaryHeading from "../headings/SecondaryHeading";
import PrimaryHeading from "../headings/PrimaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";
import { FaWhatsapp } from "react-icons/fa";

function HeroAyush() {
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20equipment%20catalog.",
      "_blank"
    );
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative z-[2] mt-[-93px] flex min-h-[100dvh] items-center bg-black text-center xl:text-left">
      {/* Background Image with semi-transparent overlay for color visibility */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover brightness-90 contrast-110 saturate-150"
        />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20 z-20">
        <div className="flex h-full items-center justify-center xl:justify-end">
          <div className="relative z-10 w-full max-w-4xl">
            <div className="space-y-6 sm:space-y-8">
              {/* Secondary heading with red accent */}
              <div className="inline-block">
                <div className="bg-red px-6 py-2 sm:px-8 sm:py-3">
                  <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Premium Quality Equipment
                  </span>
                </div>
              </div>

              <PrimaryHeading 
                title="AYUSH ENTERPRISE"
                subtitle="Premium Gym Equipment for Every Fitness Enthusiast"
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start pt-4">
                <button
                  onClick={scrollToProducts}
                  className="focus relative inline-flex items-center justify-center gap-1.5 bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase text-gray-600 before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] before:border-gray-400/50"
                >
                  View Products
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="focus relative inline-flex items-center justify-center gap-2 bg-green-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase text-white shadow-lg before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border-2 before:border-solid before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] before:border-green-400/50"
                >
                  <FaWhatsapp className="h-auto w-4" />
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
