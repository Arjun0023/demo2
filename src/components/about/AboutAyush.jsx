import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";
import { FaDumbbell, FaUserTie, FaTags, FaTools } from "react-icons/fa";

function AboutAyush() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <SecondaryHeading textColor="white" bgColor="red">
              About Us
            </SecondaryHeading>
            <TertiaryHeading>
              Your Trusted Partner in Fitness
            </TertiaryHeading>
            
            <div className="space-y-4 text-gray-350 mb-6 sm:mb-8 text-sm sm:text-base">
              <p>
                Established in 2015, <span className="font-semibold text-gray-600">Ayush Enterprise</span> has 
                been at the forefront of providing premium gym equipment to fitness enthusiasts, 
                professional athletes, and commercial gyms across the region.
              </p>
              
              <p>
                With over 8 years of experience in the fitness industry, we understand the 
                importance of quality equipment in achieving fitness goals. Our carefully curated 
                collection includes everything from basic dumbbells to advanced treadmills, 
                ensuring we meet the diverse needs of our customers.
              </p>
              
              <p>
                We pride ourselves on offering not just products, but complete fitness solutions. 
                Our team of experts is always ready to guide you in selecting the right equipment 
                for your specific requirements and budget.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">500+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Happy Customers</p>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">8+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Years of Experience</p>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">1000+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Products Delivered</p>
              </div>
            </div>

            <PrimaryButton to="/contact">Get in Touch</PrimaryButton>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop"
                  alt="Gym Equipment Display"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&h=400&fit=crop"
                  alt="Premium Fitness Equipment"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red/10 rounded-full -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red/10 rounded-full -z-10"></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-20">
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaDumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Premium Quality</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Only the best equipment from trusted brands</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaUserTie className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Expert Guidance</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Professional advice for equipment selection</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaTags className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Competitive Prices</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Best prices guaranteed with quality assurance</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaTools className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">After-Sales Support</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Complete support for installation and maintenance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAyush;
