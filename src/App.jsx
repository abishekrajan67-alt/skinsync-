import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
