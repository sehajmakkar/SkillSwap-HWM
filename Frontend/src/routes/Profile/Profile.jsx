import React from "react";
import { useFirebase } from "../../context/Firebase";
import { useEffect, useState } from "react";

const ProfilePage = () => {

  const firebase = useFirebase();

  // Demo data for the user and their doubts
  const user = {
    username: "John Doe",
    email: "john.doe@example.com",
    credits: 120,
    subscription: "Pro Member",
    profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1729702539~exp=1729706139~hmac=49ca03e949d079b6b122215892645483224b98000c4a2723665bfd79a7fe157f&w=740", // Profile image URL
  };

  const doubts = [
    { title: "How does React state management work?", status: "Active" },
    { title: "What's the best way to learn Tailwind?", status: "Solved" },
    { title: "How to optimize a React app for performance?", status: "Active" },
  ];

  return (
    <div className="flex flex-col lg:flex-row mt-20 p-5 space-y-10 lg:space-y-0 lg:space-x-10">
      
      {/* Left Section: User Info */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-5 rounded shadow-lg border border-n-9 mb-6">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            {/* Username */}
            <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
            {/* Email */}
            <p className="text-n-4 mb-2">{user.email}</p>
            {/* Credits */}
            <p className="text-n-4 mb-2">Credits: {user.credits}</p>
            {/* Subscription */}
            <p className="text-color-5 font-semibold">{user.subscription}</p>
          </div>
        </div>

        {/* Chat Button */}
        <div className="flex justify-center">
          <button className="bg-color-1 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Chat 
          </button>
        </div>
      </div>

      {/* Right Section: My Doubts */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white p-5 rounded shadow-lg border border-n-9">
          <h2 className="text-2xl font-semibold mb-4">My Doubts</h2>
          <div className="space-y-4">
            {doubts.map((doubt, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded shadow border border-n-9">
                <h3 className="text-lg font-semibold">{doubt.title}</h3>
                <p className={`mt-2 ${doubt.status === "Solved" ? "text-color-4" : "text-color-3"}`}>
                  {doubt.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
