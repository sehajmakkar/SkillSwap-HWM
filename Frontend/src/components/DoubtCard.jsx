import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi"; // Upvote icon
import { useFirebase } from "../context/Firebase"; // Use Firebase context

const DoubtCard = ({ id, title, description, author, solved, initialUpvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [isSolved, setIsSolved] = useState(solved);

  const firebase = useFirebase();

  // Handle upvote click
  const handleUpvote = async () => {
    const newUpvoteCount = upvotes + 1;
    setUpvotes(newUpvoteCount);

    // Persist upvotes to Firebase
    await firebase.updateDoubt(id, { upvotes: newUpvoteCount });
  };

  // Toggle solved/active status
  const toggleStatus = async () => {
    const newStatus = !isSolved;
    setIsSolved(newStatus);

    // Persist status change to Firebase
    await firebase.updateDoubt(id, { solved: newStatus });
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
