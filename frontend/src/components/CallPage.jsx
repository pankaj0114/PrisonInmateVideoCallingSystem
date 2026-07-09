import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { connect, createLocalVideoTrack } from 'twilio-video';

const CallPage = () => {
  const { roomName } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type'); // "audio" or "video"

  useEffect(() => {
    // Fetch Twilio Access Token from backend
    fetch('http://localhost:5000/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity: 'prisoner', // or "family" depending on who joins
        roomName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return connect(data.token, { name: roomName });
      })
      .then((room) => {
        console.log(`✅ Connected to Room: ${room.name}`);

        // Attach local video if it's a video call
        if (type === 'video') {
          createLocalVideoTrack().then((track) => {
            const videoElement = track.attach();
            document.getElementById('local-video').appendChild(videoElement);
          });
        }

        // Attach remote participants
        room.on('participantConnected', (participant) => {
          console.log(`👤 Participant connected: ${participant.identity}`);
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const track = publication.track;
              const element = track.attach();
              document.getElementById('remote-video').appendChild(element);
            }
          });

          participant.on('trackSubscribed', (track) => {
            const element = track.attach();
            document.getElementById('remote-video').appendChild(element);
          });
        });
      })
      .catch((err) => console.error('❌ Failed to join room:', err));
  }, [roomName, type]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Call Room: {roomName}</h1>
      <div className="flex space-x-6">
        <div id="local-video" className="w-1/2 bg-black rounded-lg"></div>
        <div id="remote-video" className="w-1/2 bg-black rounded-lg"></div>
      </div>
    </div>
  );
};

export default CallPage;
