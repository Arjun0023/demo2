import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";
import Slider from "./Slider";
import Customers from "./Customers";

function Testimonials() {
  return (
    <section className="overflow-x-clip px-6 py-32 text-center">
      <div className="container space-y-20 xl:space-y-32">
        <div>
          <SecondaryHeading>Ayush Sports Reviews</SecondaryHeading>
          <TertiaryHeading>
            World-class football courts, turfs, and equipment trusted by players
          </TertiaryHeading>
        </div>

        <Slider />

        <Customers />
      </div>
    </section>
  );
}

export default Testimonials;
