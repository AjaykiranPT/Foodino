import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "../styles/UserChat.css";

const socket = io("http://localhost:3000"); // Ensure this matches your backend

const UserChat = () => {
  const [broadcasts, setBroadcasts] = useState([]);

  // Fetch existing broadcasts
  const fetchBroadcasts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/broadcasts");
      setBroadcasts(response.data.reverse()); // Reverse so the latest is at the top
    } catch (error) {
      console.error("Error fetching broadcasts:", error);
    }
  };

  useEffect(() => {
    fetchBroadcasts(); // Load existing broadcasts

    // Listen for real-time updates
    socket.on("broadcast-received", (newBroadcast) => {
      setBroadcasts((prevBroadcasts) => [newBroadcast, ...prevBroadcasts]); // New message at the top
    });

    // Cleanup function
    return () => {
      socket.off("broadcast-received");
    };
  }, []);

  return (
    <div className="user-chat-container">
      <h2>Broadcasts from Master Chefs</h2>
      {broadcasts.length > 0 ? (
        broadcasts.map((broadcast) => (
          <div key={broadcast._id} className="broadcast-card">
            <h3 className="broadcast-sender">{broadcast.sender.name}</h3>
            <p className="broadcast-content">{broadcast.content}</p>
            {broadcast.mediaUrl &&
              (broadcast.mediaType === "image" ? (
                <img
                  src={broadcast.mediaUrl}
                  alt="broadcast media"
                  className="broadcast-media"
                />
              ) : (
                <video controls className="broadcast-media">
                  <source src={broadcast.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
          </div>
        ))
      ) : (
        <p>No broadcasts available.</p>
      )}
    </div>
  );
};

export default UserChat;
