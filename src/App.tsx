import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Carta from "./pages/Carta";
import Packs from "./pages/Packs";
import Cotizar from "./pages/Cotizar";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/cotizar" element={<Cotizar />} />
          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
