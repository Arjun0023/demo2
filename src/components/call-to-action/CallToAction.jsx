import TertiaryHeading from "../headings/TertiaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";

function CallToAction() {
  return (
    <section className="relative z-[1] flex justify-center bg-gray-600 text-center 2xl:text-left">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-red/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2070&auto=format&fit=crop"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 grid items-center gap-10 px-6 py-12 2xl:grid-cols-[0.8fr,200px]">
        <TertiaryHeading color="white">
          Ready to build your dream football turf or sports facility?
        </TertiaryHeading>

        <div>
          <PrimaryButton to="/contact" borderColor="white">
            Get Quote Now
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
