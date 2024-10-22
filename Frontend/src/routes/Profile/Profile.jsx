import React from "react";

const ProfilePage = () => {
  // Demo data for the user and their doubts
  const user = {
    username: "John Doe",
    email: "john.doe@example.com",
    credits: 120,
    subscription: "Pro Member",
    profileImage: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Profile image URL
  };

  const doubts = [
    { title: "How does React state management work?", status: "Active" },
    { title: "What's the best way to learn Tailwind?", status: "Solved" },
    { title: "How to optimize a React app for performance?", status: "Active" },
    { title: "How to optimize a React app for performance?", status: "Active" },
    { title: "How to optimize a React app for performance?", status: "Active" },
  ];

  return (
    <div className="flex mt-20 p-5 space-x-10">
      {/* Left Section: User Info */}
      <div className="w-1/4 bg-white p-5 rounded shadow-lg border border-n-9">
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

      {/* Right Section: User Doubts */}
      <div className="w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Your Doubts</h2>
        <div className="space-y-4">
          {doubts.map((doubt, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow border border-n-9"
            >
              <h3 className="text-xl font-semibold">{doubt.title}</h3>
              <p className={`mt-2 ${doubt.status === "Solved" ? "text-color-4" : "text-color-3"}`}>
                {doubt.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
