import React, { useState, useEffect } from "react";
import { FiThumbsUp, FiShare2, FiMessageSquare, FiVideo } from "react-icons/fi";

import { useFirebase } from "../../context/Firebase";

const SingleDoubtPage = () => {
  const firebase = useFirebase();

  // Demo data
  const demoDoubt = {
    title: "How does React state management work?",
    description:
      "Can someone explain how state management works in React, especially when it comes to lifting state up?",
    author: "John Doe",
    solved: false,
    tags: ["React", "State Management", "Frontend"],
    photoUrl: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
        {/* Main Flexbox Layout */}
        <div className="flex flex-col md:flex-row mb-4">
          {/* Doubt Image on the Left */}
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center border border-n-9 rounded">
              {demoDoubt.photoUrl ? (
                <img
                  src={demoDoubt.photoUrl}
                  alt="Doubt Image"
                  className="object-cover h-full w-full rounded"
                />
              ) : (
                <p className="text-n-4">No image uploaded for this doubt.</p>
              )}
            </div>
          </div>

          {/* Text Content on the Right */}
          <div className="md:w-2/3">
            {/* Doubt Status and Title */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-n-1">{demoDoubt.title}</h3>

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
          </div>
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
            <p className="text-n-4">
              Jane Smith: I think lifting state up is the key concept here...
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded mb-2">
            <p className="text-n-4">
              Mark Evans: You should also consider using context API for global
              state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDoubtPage;
