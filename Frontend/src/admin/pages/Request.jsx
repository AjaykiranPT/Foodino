import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Request.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/admin/requests");
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch upgrade requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (requestId, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this request?`
    );
    if (!confirmAction) return;

    try {
      const response = await axios.put("http://localhost:3000/admin/requests", {
        requestId,
        status,
      });
      if (response.status === 200) {
        setRequests((prev) =>
          prev.map((request) =>
            request._id === requestId ? { ...request, status } : request
          )
        );
        alert(`Request ${status.toLowerCase()}ed successfully!`);
      }
    } catch (err) {
      console.error(`Error ${status.toLowerCase()}ing request:`, err);
      alert(`Failed to ${status.toLowerCase()} request. Please try again.`);
    }
  };

  if (loading) {
    return <div className="loading">Loading requests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-requests">
      <h2>Manage Upgrade Requests</h2>
      <table className="requests-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Proof</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.userId?.name}</td>
              <td>{request.userId?.email}</td>
              <td>
                <img
                  src={request.proof}
                  alt="Proof"
                  className="proof-image"
                  onClick={() => setZoomedImage(request.proof)}
                />
              </td>
              <td>{request.status}</td>
              <td>
                {request.status === "Pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleAction(request._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleAction(request._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {request.status !== "Pending" && <span>No Actions Available</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {zoomedImage && (
        <div className="zoomed-image-container" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed Proof" className="zoomed-image" />
        </div>
      )}
    </div>
  );
};

export default Request;
