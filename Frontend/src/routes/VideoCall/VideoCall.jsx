import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const VideoCall = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMutedAudio, setIsMutedAudio] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(false);

  const client = useRef(null);
  const localTracks = useRef({ videoTrack: null, audioTrack: null });
  const remoteTracks = useRef({ videoTrack: null, audioTrack: null });
  const APP_ID = '8f0d738c06c741d3853b291bcbe3a63a'; // Replace with your Agora App ID
  const TOKEN = null; // Token if needed
  const CHANNEL = 'test'; // Dynamic or fixed channel

  // Video elements for local and remote users
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const joinChannel = async () => {
      client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      try {
        // Join the channel
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
  }, []);

  const handleLeave = async () => {
    if (localTracks.current.videoTrack) localTracks.current.videoTrack.close();
    if (localTracks.current.audioTrack) localTracks.current.audioTrack.close();
    await client.current.leave();
    setIsJoined(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div id="videos" className="flex space-x-4">
        <div className="w-64 h-48 bg-black" ref={localVideoRef}></div>
        <div className="w-64 h-48 bg-black" ref={remoteVideoRef}></div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleAudio}>
          {isMutedAudio ? 'Unmute Audio' : 'Mute Audio'}
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleVideo}>
          {isMutedVideo ? 'Unmute Video' : 'Mute Video'}
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLeave}>
          Leave Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
