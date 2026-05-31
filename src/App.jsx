import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import ResumeViewer from "./pages/ResumeViewer";
import Notifications from "./pages/Notifications";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Navbar from "./components/Navbar";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import MyApplications from "./pages/MyApplications";

function App() {
  return (
    <BrowserRouter>
<Navbar/>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

    <Route
  path="/profile"
  element={<Profile />}
/>



<Route
  path="/resume-viewer"
  element={<ResumeViewer />}
/>

        <Route
          path="/jobs"
          element={<Jobs />}
        />
<Route
  path="/post-job"
  element={<PostJob />}
/>


<Route
 path="/notifications"
 element={<Notifications />}
/>
<Route
  path="/student-dashboard"
  element={<StudentDashboard />}
/>

<Route
  path="/recruiter-dashboard"
  element={<RecruiterDashboard />}
/>
<Route
  path="/apply/:jobId"
  element={<ApplyJob />}
/>


<Route
  path="/my-applications"
  element={<MyApplications />}
/>
<Route
  path="/applications-received"
  element={<Applications />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;