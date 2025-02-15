import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "../styles/broadcast.css";

const socket = io("http://localhost:3000");

const Broadcast = () => {
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Reference to file input

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setStatus("Error: User ID not found.");
      console.error("User ID not found.");
      return;
    }

    setLoading(true);
    setStatus("Uploading...");

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
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
        setStatus("Uploaded successfully! ✅");
        socket.emit("new-broadcast", response.data.broadcast);
      } else {
        setStatus("Failed to send broadcast ❌");
      }
    } catch (error) {
      setStatus("Error sending broadcast ❌");
      console.error("Error sending broadcast:", error);
    }

    setLoading(false);
    setTimeout(() => setStatus(""), 3000);
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
        <input
          type="file"
          ref={fileInputRef} // Reference for clearing input
          onChange={(e) => setMediaFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            "Send Broadcast"
          )}
        </button>
      </form>
      {status && <p className="upload-status">{status}</p>}
    </div>
  );
};

export default Broadcast;
