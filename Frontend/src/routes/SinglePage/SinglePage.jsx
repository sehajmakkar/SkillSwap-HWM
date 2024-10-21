import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi"; // Upvote icon
import { FiShare2 } from "react-icons/fi"; // Share icon
import { FiMessageSquare } from "react-icons/fi"; // Chat icon
import { FiVideo } from "react-icons/fi"; // Video call icon

const SingleDoubtPage = () => {
  // Demo data
  const demoDoubt = {
    title: "How does React state management work?",
    description:
      "Can someone explain how state management works in React, especially when it comes to lifting state up?",
    author: "John Doe",
    solved: false,
    tags: ["React", "State Management", "Frontend"],
  };

  const [upvotes, setUpvotes] = useState(10);
  const [isSolved, setIsSolved] = useState(demoDoubt.solved);

  // Handle upvote click
  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  // Toggle solved/active status
  const toggleStatus = () => {
    setIsSolved(!isSolved);
  };

  return (
    <div className="mt-20 p-5">
      {/* Doubt Card */}
      <div className="bg-white p-5 rounded shadow-lg border border-n-9">
        {/* Doubt Status */}
        <div className="flex justify-between items-center mb-3">
          {/* Title */}
          <h3 className="text-xl font-semibold text-n-1">{demoDoubt.title}</h3>

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
        <p className="text-n-3 mb-4">{demoDoubt.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap mb-4">
          {demoDoubt.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-color-6 text-white text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author and Actions */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-n-4">Asked by {demoDoubt.author}</p>

          <div className="flex space-x-4">
            {/* Upvote Button */}
            <button
              onClick={handleUpvote}
              className="flex items-center bg-color-1 text-white px-3 py-2 rounded"
            >
              <FiThumbsUp className="mr-2" /> {upvotes} Upvotes
            </button>

            {/* Share Button */}
            <button className="flex items-center bg-color-5 text-white px-3 py-2 rounded">
              <FiShare2 className="mr-2" /> Share
            </button>

            {/* Chat Button */}
            <button className="flex items-center bg-color-2 text-white px-3 py-2 rounded">
              <FiMessageSquare className="mr-2" /> Chat with Author
            </button>

            {/* Zoom Call Button */}
            <button className="flex items-center bg-color-3 text-white px-3 py-2 rounded">
              <FiVideo className="mr-2" /> 1-to-1 Zoom Call
            </button>
          </div>
        </div>

        {/* Replies/Comments Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Replies/Comments</h4>
          <div className="bg-gray-100 p-3 rounded mb-2">
            <p className="text-n-4">Jane Smith: I think lifting state up is the key concept here...</p>
          </div>
          <div className="bg-gray-100 p-3 rounded mb-2">
            <p className="text-n-4">Mark Evans: You should also consider using context API for global state.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDoubtPage;
