import { useState } from "react";
import API from "../services/api";
import "./Profile.css";

function RecruiterProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    company: user?.company || "",
    designation: user?.designation || "",
    experience: user?.experience || "",
    education: user?.education || "",
    website: user?.website || "",
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
        <h2>Recruiter Profile</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={profile.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={profile.designation}
            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={profile.experience}
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
            name="website"
            placeholder="Company Website"
            value={profile.website}
            onChange={handleChange}
          />

          <button type="submit">Update Profile</button>
        </form>

        <hr />

        <h3>Saved Profile</h3>

        <p>
          <strong>Company:</strong> {user?.company}
        </p>

        <p>
          <strong>Designation:</strong> {user?.designation}
        </p>

        <p>
          <strong>Experience:</strong> {user?.experience}
        </p>

        <p>
          <strong>Education:</strong> {user?.education}
        </p>

        <p>
          <strong>Website:</strong> {user?.website}
        </p>
      </div>
    </div>
  );
}

export default RecruiterProfile;
