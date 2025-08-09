import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation/NavbarAyush";
import HomeAyush from "./Pages/HomeAyush";
import AboutAyush from "./Pages/AboutAyush";
import ContactAyush from "./Pages/ContactAyush";
import FooterAyush from "./components/footer/FooterAyush";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<HomeAyush />} />
        <Route path="about" element={<AboutAyush />} />
        <Route path="contact" element={<ContactAyush />} />
      </Routes>
      <FooterAyush />
      <ScrollToTop />
    </>
  );
}

export default App;
