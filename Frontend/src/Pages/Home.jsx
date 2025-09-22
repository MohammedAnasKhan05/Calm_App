import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // Fetch data from backend on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/endpoint`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  //  useEffect(() => {
  //   // Use the environment variable from .env
  //   fetch(`${import.meta.env.VITE_API_URL}/api/endpoint`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("API response:", data);
  //     })
  //     .catch(err => {
  //       console.error("API error:", err);
  //     });
  // }, []);

  const handleGetStarted = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/prompt");
    } else {
      navigate("/login"); // or "/signup"
    }
  };

  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-8xl bg-white rounded-3xl shadow-lg p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center items-center gap-4 mb-6">
          <img
            src="/Mental Health Tool Kit.png"
            alt="Wellness 2"
            className="rounded-lg shadow"
          />
          <img src="/Ai image.jpg" alt="Wellness 1" className="rounded-lg shadow" />
          <img
            src="/Wellness 1.jpg"
            alt="Wellness 3"
            className="rounded-lg shadow"
          />
        </div>
        <h2 className="text-black text-4xl font-extrabold mb-4">Mental Health</h2>
        <p className="text-gray-600 text-xl mb-6">
          Many young people struggle with stress, anxiety, and depression, often in
          silence due to stigma or lack of access to help. Mental wellness is about
          resilience, coping skills, and confidence.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-indigo-700 text-white text-2xl px-6 py-2 rounded-full hover:bg-indigo-800 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}