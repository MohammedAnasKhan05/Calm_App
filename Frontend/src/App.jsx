// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Prompt from "./pages/Prompt";
import About from "./pages/About";
import PromptHistory from "./pages/PromptHistory";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/prompt-history" element={<PromptHistory />} />
      </Routes>
      <Footer />
    </Router>
  );
}
