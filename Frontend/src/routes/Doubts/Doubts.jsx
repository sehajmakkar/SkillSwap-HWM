import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"; // Search icon from react-icons
import DoubtCard from "../../components/DoubtCard"; // Import the DoubtCard component
import { useFirebase } from "../../context/Firebase";
import { Link } from "react-router-dom";
import SingleDoubtPage from "../SinglePage/SinglePage";
import AddDoubt from "../AddDoubt/AddDoubt";

const Doubts = () => {
  const firebase = useFirebase();
  const [doubts, setDoubts] = useState([]);

  // Fetch doubts on component mount
  useEffect(() => {
    firebase.listAllDoubts().then((snapshot) => {
      const fetchedDoubts = snapshot.docs.map((doc) => ({
        id: doc.id, // In case you need to reference the ID later
        ...doc.data(), // Spread the actual document data (title, description, status, etc.)
      }));
      setDoubts(fetchedDoubts);
    });
  }, [firebase]);

  return (
    <div className="min-h-screen bg-white-purple-gradient flex flex-col items-center p-5 pt-20">
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
        <Link to="/add-doubt">
          <div className="flex justify-end mb-6">
            <button className="button bg-color-2 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ask a Doubt
            </button>
          </div>
        </Link>

        {/* Doubt Cards Section */}
        <div className="grid grid-cols-1 gap-6">
          {doubts.length > 0 ? (
            doubts.map((doubt) => (
              <DoubtCard
                key={doubt.id} // Make sure to use a unique key
                title={doubt.title}
                {...doubt}
                description={doubt.description}
                author={doubt.displayname || doubt.userEmail} // Use author or email
                status={doubt.status} // Pass status to show solved or active
              />
            ))
          ) : (
            <p className="text-center text-n-3">No doubts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doubts;
