import Sidebar from "../components/Sidebar";
import StudentProfile from "./StudentProfile";
import RecruiterProfile from "./RecruiterProfile";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="profile-page">
        <Sidebar />

        <div className="profile-content">
          {user?.role === "student" ? <StudentProfile /> : <RecruiterProfile />}
        </div>
      </div>
    </>
  );
}

export default Profile;
