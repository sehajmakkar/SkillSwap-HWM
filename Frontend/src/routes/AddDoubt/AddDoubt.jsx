import React, { useState } from "react";
import { useFirebase } from "../../context/Firebase";

const AddDoubt = () => {

  const firebase = useFirebase();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [status, setStatus] = useState("Active");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(title, description, image, tags, status);
    // Handle form submission logic here
  };

  return (
    <div className="mt-20 p-5 bg-white rounded shadow-lg border border-n-9 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-color-1 mb-5">Submit Your Doubt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Doubt Title */}
        <div>
          <label htmlFor="title" className="block text-n-3 font-medium">
            Doubt Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-n-9 rounded focus:outline-none focus:border-color-1 text-n-1 bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-n-3 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-n-9 rounded focus:outline-none focus:border-color-1 text-n-1 bg-white"
            rows="5"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-n-3 font-medium">
            Upload an Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-n-9 rounded focus:outline-none focus:border-color-1 text-n-1 bg-white"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-n-3 font-medium">
            Tags
          </label>
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="text"
              id="tags"
              value={newTag}
              onChange={handleNewTagChange}
              className="p-2 border border-n-9 rounded focus:outline-none focus:border-color-1 text-n-1 bg-white"
              placeholder="Enter tag"
            />
            <button
              onClick={handleAddTag}
              className="bg-color-1 text-white font-bold py-2 px-4 rounded"
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-color-6 text-white text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                #{tag} &times;
              </span>
            ))}
          </div>
        </div>

        {/* Solved/Active Selection */}
        <div>
          <label htmlFor="status" className="block text-n-3 font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-n-9 rounded focus:outline-none focus:border-color-1 text-n-1 bg-white"
          >
            <option value="Active">Active</option>
            <option value="Solved">Solved</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-color-1 text-white font-bold py-2 px-4 rounded hover:bg-color-2"
          >
            Submit Doubt
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoubt;
