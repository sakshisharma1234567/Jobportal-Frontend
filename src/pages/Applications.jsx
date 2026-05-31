import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Applications.css";
import { Link } from "react-router-dom";

function Applications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/recruiter/${user._id}`);

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="applications-page">
      <Sidebar />

      <div className="applications-container">
        <h1>Applications Received</h1>

        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="application-card">
              <h3>{app.name}</h3>

              <p>Email: {app.email}</p>

              <p>Phone: {app.phone}</p>

              <p>
                <strong>Job:</strong> {app.jobId?.title}
              </p>

              <p>
                Status: <strong>{app.status}</strong>
              </p>

              <Link
                to="/resume-viewer"
                state={{
                  resume: app.resume,
                }}
              >
                View Resume
              </Link>
            </div>
          ))
        ) : (
          <h3>No Applications Received</h3>
        )}
      </div>
    </div>
  );
}

export default Applications;
