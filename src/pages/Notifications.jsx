

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Notifications.css";

function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    markNotificationsRead();
  }, []);

  const markNotificationsRead = async () => {
    try {
      await API.put(`/notifications/read/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get(`/notifications/${user._id}`);

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notifications-page">
      <Sidebar />

      <div className="notifications-container">
        <h1 className="notifications-title">Notifications</h1>

        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div key={item._id} className="notification-card">
              <span className="notification-message">🔔 {item.message}</span>
            </div>
          ))
        ) : (
          <div className="notification-card">No Notifications Yet</div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
