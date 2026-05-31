import { useState } from "react";
import API from "../services/api";
import "./Profile.css";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    college: user?.college || "",
    education: user?.education || "",
    skills: user?.skills || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/users/${user._id}`, profile);

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile Updated Successfully");

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Student Profile</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="college"
            placeholder="College"
            value={profile.college}
            onChange={handleChange}
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={profile.education}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={profile.skills}
            onChange={handleChange}
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={profile.github}
            onChange={handleChange}
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Link"
            value={profile.linkedin}
            onChange={handleChange}
          />

          <button type="submit">Update Profile</button>
        </form>

        <hr />

        <h3>Saved Profile</h3>

        <p>
          <strong>College:</strong> {user?.college}
        </p>

        <p>
          <strong>Education:</strong> {user?.education}
        </p>

        <p>
          <strong>Skills:</strong> {user?.skills}
        </p>

        <p>
          <strong>GitHub:</strong> {user?.github}
        </p>

        <p>
          <strong>LinkedIn:</strong> {user?.linkedin}
        </p>
      </div>
    </div>
  );
}

export default StudentProfile;
