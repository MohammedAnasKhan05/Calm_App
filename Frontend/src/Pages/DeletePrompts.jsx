import { useState } from "react";

export default function DeletePrompts() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setMessage("");
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setMessage("You must be logged in to delete your prompts.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/prompt-history?email=${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("All your prompts have been deleted.");
      } else {
        setMessage(data.message || "Failed to delete prompts.");
      }
    } catch {
      setMessage("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Delete All Prompts</h2>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete My Prompts"}
        </button>
        {message && <div className="mt-4 text-lg">{message}</div>}
      </div>
    </div>
  );
}