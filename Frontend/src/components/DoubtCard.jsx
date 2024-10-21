import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi"; // Upvote icon

const DoubtCard = ({ title, description, author, solved }) => {
  const [upvotes, setUpvotes] = useState(0);
  const [isSolved, setIsSolved] = useState(solved);

  // Handle upvote click
  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  // Toggle solved/active status
  const toggleStatus = () => {
    setIsSolved(!isSolved);
  };

  return (
    <div className="bg-white p-5 rounded shadow-lg border border-n-9">
      {/* Doubt Status */}
      <div className="flex justify-between items-center mb-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-n-1">{title}</h3>

        {/* Solved/Active Button */}
        <button
          onClick={toggleStatus}
          className={`text-white py-1 px-3 rounded ${
            isSolved ? "bg-color-4" : "bg-color-3"
          }`}
        >
          {isSolved ? "Solved" : "Active"}
        </button>
      </div>

      {/* Doubt Description */}
      <p className="text-n-3 mb-4">{description}</p>

      {/* Author and Upvote */}
      <div className="flex justify-between items-center">
        <p className="text-n-4">Asked by {author}</p>

        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          className="flex items-center bg-color-1 text-white px-3 py-2 rounded"
        >
          <FiThumbsUp className="mr-2" /> {upvotes} Upvotes
        </button>
      </div>
    </div>
  );
};

export default DoubtCard;
