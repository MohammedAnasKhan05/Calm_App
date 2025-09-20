
export default function About() {
  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">About Calm</h2>
        <p className="text-gray-600 mb-6">
          Calm is a platform built to support mental wellness for young people and adults. 
          We believe that mental health is just as important as physical health, 
          and that everyone deserves access to tools that foster resilience, 
          coping skills, and self-confidence.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left mb-6">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700">🌱 Wellness Resources</h3>
            <p className="text-gray-600 mt-2">
              Explore resources and tips to manage stress, anxiety, and depression effectively.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700">💬 AI Support</h3>
            <p className="text-gray-600 mt-2">
              Interact with our prompt-based AI for guidance, reflection, and emotional support.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700">🤝 Community</h3>
            <p className="text-gray-600 mt-2">
              Connect with others who share similar experiences and build supportive networks.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700">🔒 Privacy First</h3>
            <p className="text-gray-600 mt-2">
              Your data is secure, and your privacy is always respected at Calm.
            </p>
          </div>
        </div>

        <p className="text-gray-700 font-medium">
          Our mission is to empower individuals to live healthier, more balanced lives 
          by promoting open conversations and providing easy-to-access mental health tools.
        </p>
      </div>
    </div>
  );
}
