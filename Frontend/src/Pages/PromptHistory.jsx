import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PromptHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    fetch(`http://localhost:5000/prompt-history?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Prompt History</h2>
          <Link
            to="/prompt-history"
            className="ml-6 text-white text-base hover:underline"
          >
            Prompt History
          </Link>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500">No prompts found.</div>
        ) : (
          <ul className="space-y-4">
            {history.map((item, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="font-semibold">Prompt:</div>
                <div className="text-gray-700">{item.prompt}</div>
                {item.email && (
                  <div className="text-xs text-gray-400">User: {item.email}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}