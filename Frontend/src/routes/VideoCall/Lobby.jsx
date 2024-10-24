import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [inviteCode, setInviteCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      navigate(`/videocall?room=${inviteCode}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleJoin} className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">👋 Create OR Join a Room</h2>
        <input
          type="text"
          placeholder="Enter Room Code"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Lobby;
