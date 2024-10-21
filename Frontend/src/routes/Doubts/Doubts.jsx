import React from "react";
import { FiSearch } from "react-icons/fi"; // Search icon from react-icons
import DoubtCard from "../../components/DoubtCard"; // Import the DoubtCard component
import Header from "../../components/Header";

const Doubts = () => {
  return (
    <div className="min-h-screen bg-n-7 flex flex-col items-center p-5 pt-20">
      {/* pt-20 ensures that content doesn't overlap with the header */}
      <div className="max-w-3xl w-full bg-n-8 p-6 rounded shadow-lg mb-10">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="w-full px-3 py-2 border border-n-9 rounded bg-n-6 text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1"
            placeholder="Search doubts..."
          />
          <button className="ml-3 p-2 bg-color-1 text-white rounded focus:outline-none focus:shadow-outline">
            <FiSearch size={24} />
          </button>
        </div>

        {/* Ask a Doubt Button */}
        <div className="flex justify-end mb-6">
          <button className="button bg-color-2 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ask a Doubt
          </button>
        </div>

        {/* Doubt Cards Section */}
        <div className="grid grid-cols-1 gap-6">
          <DoubtCard
            title="How does React's useEffect hook work?"
            description="I'm confused about how to use the useEffect hook in React. Can someone explain with an example?"
            author="John Doe"
          />
          <DoubtCard
            title="What is the difference between == and === in JavaScript?"
            description="Can someone explain the difference between == and === in JavaScript? When should I use which?"
            author="Jane Smith"
          />
        </div>
      </div>
    </div>
  );
};

export default Doubts;
