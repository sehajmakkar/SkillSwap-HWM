import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const VideoCall = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMutedAudio, setIsMutedAudio] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another route
  const location = useLocation(); // Hook to access the current URL
  
  const client = useRef(null);
  const localTracks = useRef({ videoTrack: null, audioTrack: null });
  const remoteTracks = useRef({ videoTrack: null, audioTrack: null });
  const APP_ID = '8f0d738c06c741d3853b291bcbe3a63a'; // Replace with your Agora App ID
  const TOKEN = null; // Token if needed

  // Extract the room code from the URL
  const queryParams = new URLSearchParams(location.search);
  const CHANNEL = queryParams.get('room') || 'default-room'; // If no room is provided, default to 'default-room'

  // Video elements for local and remote users
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const joinChannel = async () => {
      client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      try {
        // Join the channel using the dynamic room code
        await client.current.join(APP_ID, CHANNEL, TOKEN, null);

        // Create local tracks for video and audio
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        localTracks.current.audioTrack = audioTrack;
        localTracks.current.videoTrack = videoTrack;

        // Play the local video
        videoTrack.play(localVideoRef.current);

        // Publish local tracks
        await client.current.publish([audioTrack, videoTrack]);

        // Handle remote user joining and publishing tracks
        client.current.on('user-published', async (user, mediaType) => {
          await client.current.subscribe(user, mediaType);

          if (mediaType === 'video') {
            remoteTracks.current.videoTrack = user.videoTrack;
            remoteTracks.current.videoTrack.play(remoteVideoRef.current);
          }

          if (mediaType === 'audio') {
            remoteTracks.current.audioTrack = user.audioTrack;
            remoteTracks.current.audioTrack.play();
          }
        });

        setIsJoined(true);
      } catch (error) {
        console.error('Error joining Agora channel:', error);
      }
    };

    joinChannel();

    return () => {
      // Cleanup on component unmount
      if (localTracks.current.videoTrack) localTracks.current.videoTrack.close();
      if (localTracks.current.audioTrack) localTracks.current.audioTrack.close();
      if (client.current) client.current.leave();
    };
  }, [CHANNEL]);

  const handleLeave = async () => {
    if (localTracks.current.videoTrack) localTracks.current.videoTrack.close();
    if (localTracks.current.audioTrack) localTracks.current.audioTrack.close();
    await client.current.leave();
    setIsJoined(false);
    navigate('/lobby'); // Navigate to the lobby after leaving
  };

  const toggleAudio = () => {
    if (isMutedAudio) {
      localTracks.current.audioTrack.setEnabled(true);
      setIsMutedAudio(false);
    } else {
      localTracks.current.audioTrack.setEnabled(false);
      setIsMutedAudio(true);
    }
  };

  const toggleVideo = () => {
    if (isMutedVideo) {
      localTracks.current.videoTrack.setEnabled(true);
      setIsMutedVideo(false);
    } else {
      localTracks.current.videoTrack.setEnabled(false);
      setIsMutedVideo(true);
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-white to-purple-200 flex items-center justify-center">
      {/* Video Grid */}
      <div id="videos" className="grid grid-cols-2 w-full h-full">
        {/* Local Video */}
        <video ref={localVideoRef} className="video-player w-full h-full object-cover"></video>
        {/* Remote Video */}
        <video ref={remoteVideoRef} className="video-player w-full h-full object-cover"></video>
      </div>

      {/* Controls */}
      <div id="controls" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
        {/* Toggle Camera */}
        <button
          className="control-container bg-purple-500 p-4 rounded-full text-white hover:bg-purple-700 transition"
          onClick={toggleVideo}
        >
          {isMutedVideo ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
        </button>

        {/* Toggle Microphone */}
        <button
          className="control-container bg-purple-500 p-4 rounded-full text-white hover:bg-purple-700 transition"
          onClick={toggleAudio}
        >
          {isMutedAudio ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
        </button>

        {/* Leave Button */}
        <button
          className="control-container bg-red-500 p-4 rounded-full text-white hover:bg-red-700 transition"
          onClick={handleLeave}
        >
          <FaPhoneSlash size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
