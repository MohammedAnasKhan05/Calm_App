// pages/Support.jsx
export default function Support() {
  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Support</h2>
        <p className="text-gray-600 mb-6">
          If you’re facing mental health challenges, you are not alone.  
          Reach out for guidance, resources, or professional help.  
        </p>
        <a href="mailto:support@calm.com" className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition">
          Contact Us
        </a>
      </div>
    </div>
  );
}
  