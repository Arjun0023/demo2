import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";

function Title() {
  return (
    <div className="mb-10">
      <SecondaryHeading>Why choose us</SecondaryHeading>
      <TertiaryHeading color="white">
        W can give a shape of your body here!
      </TertiaryHeading>
      <p className="font-medium text-gray-200">
        At <b>Ayush Enterprise</b>, we are dedicated to providing premium gym equipment
        for your fitness journey. Our expert team will work with you to
        select the perfect equipment that helps you reach
        your specific goals.
      </p>
    </div>
  );
}

export default Title;
