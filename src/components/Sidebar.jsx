import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";

function Sidebar() {

  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
  

 <div className="sidebar">

        <h3>Menu</h3>

        <ul>

          <li>
            <Link
              to={
                user?.role === "student"
                  ? "/student-dashboard"
                  : "/recruiter-dashboard"
              }
            >
              Dashboard
            </Link>
          </li>

   <li>
  <Link to="/jobs">
    Jobs
  </Link>
</li>

{user?.role === "student" && (
  <li>
    <Link to="/my-applications">
      My Applications
    </Link>
  </li>
)}

{user?.role === "recruiter" && (
  <li>
    <Link to="/applications-received">
      Applications Received
    </Link>
  </li>
)}

<li>
  <Link to="/notifications">
    Notifications
  </Link>
</li>

<li>
  <Link to="/profile">
    Profile
  </Link>
</li>

{user?.role === "recruiter" && (
  <li>
    <Link to="/post-job">
      Post Job
    </Link>
  </li>
)}
        </ul>

      </div>
    </>
  );
}

export default Sidebar;