// import Sidebar from "../components/Sidebar";
// import "./Dashboard.css";
// import { useState, useEffect } from "react";
// import API from "../services/api";

// function StudentDashboard() {

//   const user = JSON.parse(
//     localStorage.getItem("user")
//   );
//   const [notificationCount,
//   setNotificationCount] =
//   useState(0);

// useEffect(() => {
//   fetchNotifications();
// }, []);

// const fetchNotifications =
// async () => {

//   try {

//     const res =
//       await API.get(
//         `/notifications/${user._id}`
//       );

//     setNotificationCount(
//       res.data.filter(
//         item => item.isRead !== true
//       ).length
//     );

//   } catch (error) {

//     console.log(error);

//   }

// };

//   const profileFields = [
//     user?.college,
//     user?.education,
//     user?.skills,
//     user?.github,
//     user?.linkedin
//   ];

//   const completedFields =
//     profileFields.filter(
//       (field) => field && field !== ""
//     ).length;

//   const profileCompletion =
//     Math.round(
//       (completedFields / 5) * 100
//     );

//   return (
//     <div style={{ display: "flex" }}>

//       <Sidebar />

//       <div
//         className="dashboard-container"
//         style={{ flex: 1 }}
//       >

//         <h1>
//           Welcome {user?.name}
//         </h1>

//         <div className="stats-grid">

//         <div className="stat-card">
//   <h3>Applications</h3>
//   <p>{user?.applicationsCount || 0}</p>
// </div>

//           <div className="stat-card">
//             <h3>Profile Completion</h3>
//             <p>
//               {profileCompletion}%
//             </p>
//           </div>

//           <div className="stat-card">
//             <h3>Skills Added</h3>
//             <p>
//               {user?.skills
//                 ? user.skills
//                     .split(",")
//                     .length
//                 : 0}
//             </p>
//           </div>

//           <div className="stat-card">
//             <h3>Notifications</h3>
//             <p>{notificationCount}</p>
//           </div>

//         </div>

//         <div className="dashboard-section">

//           <h2>
//             Student Profile
//           </h2>

//           <div className="activity-card">
//             College :
//             {" "}
//             {user?.college ||
//               "Not Added"}
//           </div>

//           <div className="activity-card">
//             Education :
//             {" "}
//             {user?.education ||
//               "Not Added"}
//           </div>

//           <div className="activity-card">
//             Skills :
//             {" "}
//             {user?.skills ||
//               "Not Added"}
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default StudentDashboard;
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import API from "../services/api";

function StudentDashboard() {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(localUser);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${localUser._id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const profileFields = [
    user?.college,
    user?.education,
    user?.skills,
    user?.github,
    user?.linkedin,
  ];

  const completedFields = profileFields.filter(
    (field) => field && field !== "",
  ).length;

  const profileCompletion = Math.round((completedFields / 5) * 100);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="dashboard-container" style={{ flex: 1 }}>
        <h1>Welcome {user?.name}</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Applications</h3>
            <p>{user?.applicationsCount || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Profile Completion</h3>
            <p>{profileCompletion}%</p>
          </div>

          <div className="stat-card">
            <h3>Skills Added</h3>
            <p>{user?.skills ? user.skills.split(",").length : 0}</p>
          </div>

          <div className="stat-card">
            <h3>Notifications</h3>
            <p>{notificationCount}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Student Profile</h2>

          <div className="activity-card">
            College : {user?.college || "Not Added"}
          </div>

          <div className="activity-card">
            Education : {user?.education || "Not Added"}
          </div>

          <div className="activity-card">
            Skills : {user?.skills || "Not Added"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
