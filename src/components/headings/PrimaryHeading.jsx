function PrimaryHeading({ title, subtitle }) {
  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      {title || "MAKE YOUR BODY"}
      <br /> <span className="font-regular text-2xl sm:text-3xl lg:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{subtitle || "FIT & PERFECT"}</span>
    </h1>
  );
}

export default PrimaryHeading;
