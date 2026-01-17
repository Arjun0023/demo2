import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation/NavbarAyush";
import HomeAyush from "./Pages/HomeAyush";
import AboutAyush from "./Pages/AboutAyush";
import ContactAyush from "./Pages/ContactAyush";
import Shop from "./Pages/Shop";
import CategoryPage from "./Pages/CategoryPage";
import Admin from "./Pages/Admin";
import SearchPage from "./Pages/SearchPage";
import ProductDetails from "./Pages/ProductDetails";
import FooterAyush from "./components/footer/FooterAyush";
import ScrollToTop from "./components/ScrollToTop";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <NavBar />
      <Routes>
        <Route index element={<HomeAyush />} />
        <Route path="shop" element={<Shop />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="about" element={<AboutAyush />} />
        <Route path="contact" element={<ContactAyush />} />
      </Routes>
      <FooterAyush />
      <ScrollToTop />
    </ProductProvider>
  );
}

export default App;
