import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function RecruiterDashboard() {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(localUser);

  const [notificationCount, setNotificationCount] = useState(0);

  const [recentApplicants, setRecentApplicants] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchRecentApplicants();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get(`/notifications/${localUser._id}`);

      setNotificationCount(
        res.data.filter((item) => item.isRead !== true).length,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentApplicants = async () => {
    try {
      const res = await API.get(`/applications/recruiter/${localUser._id}`);

      setRecentApplicants(res.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${localUser._id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="dashboard-container" style={{ flex: 1 }}>
        <h1>Welcome {user?.name}</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Jobs Posted</h3>
            <p>{user?.jobsPosted || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Applicants</h3>
            <p>{user?.applicantsCount || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Active Jobs</h3>
            <p>{user?.jobsPosted || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Notifications</h3>
            <p>{notificationCount}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Applicants</h2>

          {recentApplicants.length > 0 ? (
            recentApplicants.map((applicant) => (
              <div key={applicant._id} className="recent-applicant-card">
                <h4>{applicant.name}</h4>

                <p>Job: {applicant.jobId?.title}</p>

                <p>Status: {applicant.status}</p>
              </div>
            ))
          ) : (
            <div className="activity-card">No Recent Applicants</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
