import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import '../styles/broadcast.css'

const socket = io("http://localhost:3000");

const Broadcast = () => {
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", userId);

    if (mediaFile) {
      formData.append("media", mediaFile);
    }

    try {
      const response = await axios.post("http://localhost:3000/broadcasts/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setContent("");
        setMediaFile(null);
        console.log("Broadcast sent successfully:", response.data);

        socket.emit("new-broadcast", response.data.broadcast);
      } else {
        console.error("Failed to send broadcast:", response.data.error);
      }
    } catch (error) {
      console.error("Error sending broadcast:", error);
    }
  };

  return (
    <div className="broadcast-container">
      <h2>Send Broadcast to Foodies</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your broadcast..."
          required
        />
        <input type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
        <button type="submit">Send Broadcast</button>
      </form>
    </div>
  );
};

export default Broadcast;
