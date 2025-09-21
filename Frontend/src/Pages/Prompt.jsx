// pages/Prompt.jsx
import { useState } from "react";

export default function Prompt() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const email = localStorage.getItem("userEmail");
      const res = await fetch("https://calm-app.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, email }), // include email!
      });
      const data = await res.json();
      setOutput(data.response || "No response");
    } catch {
      setOutput("Server error. Please try again.");
    }
    setLoading(false);
    setInput("");
  };

  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center">
        <div className="h-40 border rounded-lg flex items-center justify-center text-gray-500 mb-6">
          {loading ? "Loading..." : output || "Output of Prompt"}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Prompt Here"
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
