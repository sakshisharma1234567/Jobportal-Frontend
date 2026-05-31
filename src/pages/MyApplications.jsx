import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function MyApplications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/student/${user._id}`);

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        className="applications-container"
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>My Applications</h1>

        {applications.length > 0 ? (
          applications.map((app) => (
            <div
              key={app._id}
              className="application-card"
              style={{
                background: "#fff",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{app.jobId?.title}</h3>

              <p>
                <strong>Company:</strong> {app.jobId?.company}
              </p>

              <p>
                <strong>Location:</strong> {app.jobId?.location}
              </p>

              <p>
                <strong>Status:</strong> {app.status}
              </p>

              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <h2>No Applications Yet</h2>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
