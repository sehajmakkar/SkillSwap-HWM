import React, { useState, useEffect } from "react";
import { FiThumbsUp, FiShare2, FiMessageSquare, FiVideo } from "react-icons/fi";
import { useFirebase } from "../../context/Firebase";
import { useParams } from "react-router-dom";

const SingleDoubtPage = () => {
  const firebase = useFirebase();
  const params = useParams();

  const [data, setData] = useState(null);
  const [upvotes, setUpvotes] = useState(10);
  const [isSolved, setIsSolved] = useState(false); // Initially false
  const [url, setURL] = useState(null);

  // Handle upvote click
  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  // Toggle solved/active status
  const toggleStatus = () => {
    setIsSolved(!isSolved);
  };

  useEffect(() => {
    firebase.getDoubtById(params.id).then((doubt) => {
      const doubtData = doubt.data();
      setData(doubtData);
      setIsSolved(doubtData.status === "Solved");
    });
  }, []);

  useEffect(() => {
    if (data && data.imageURL) {
      firebase.getImageURL(data.imageURL).then((url) => {
        setURL(url);
      });
    }
  }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="mt-20 p-5">
      <div className="bg-white p-5 rounded shadow-lg border border-n-9">
        <div className="flex flex-col md:flex-row mb-4">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center border border-n-9 rounded">
              {url ? (
                <img
                  src={url}
                  alt="Doubt Image"
                  className="object-cover h-full w-full rounded"
                />
              ) : (
                <p className="text-n-4">No image uploaded for this doubt.</p>
              )}
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-n-1">{data.title}</h3>

              <button
                onClick={toggleStatus}
                className={`text-white py-1 px-3 rounded ${
                  isSolved ? "bg-color-4" : "bg-color-3"
                }`}
              >
                {isSolved ? "Solved" : "Active"}
              </button>
            </div>

            <p className="text-n-3 mb-4">{data.description}</p>

            <div className="flex flex-wrap mb-4">
              {data.tags &&
                data.tags.map((tag, index) => (
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

        <div className="flex justify-between items-center mb-4">
          <p className="text-n-4">Asked by {data.displayname || data.userEmail}</p>

          <div className="flex space-x-4">
            <button
              onClick={handleUpvote}
              className="flex items-center bg-color-1 text-white px-3 py-2 rounded"
            >
              <FiThumbsUp className="mr-2" /> {upvotes} Upvotes
            </button>

            <button className="flex items-center bg-color-5 text-white px-3 py-2 rounded">
              <FiShare2 className="mr-2" /> Share
            </button>

            <button className="flex items-center bg-color-2 text-white px-3 py-2 rounded">
              <FiMessageSquare className="mr-2" /> Chat with Author
            </button>

            <button className="flex items-center bg-color-3 text-white px-3 py-2 rounded">
              <FiVideo className="mr-2" /> 1-to-1 Zoom Call
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Replies/Comments</h4>
          {/* Comments section here */}
        </div>
      </div>
    </div>
  );
};

export default SingleDoubtPage;
