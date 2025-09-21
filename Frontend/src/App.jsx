// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Support from "./Pages/Support";
import About from "./Pages/About";
import Prompt from "./Pages/Prompt";
import PromptHistory from "./Pages/PromptHistory";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-indigo-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/prompt-history" element={<PromptHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
