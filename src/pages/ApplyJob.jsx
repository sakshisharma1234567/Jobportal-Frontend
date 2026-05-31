import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "./ApplyJob.css";

function ApplyJob() {
  const { jobId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    college: "",
    education: "",
    skills: "",
    phone: "",
    linkedin: "",
    github: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("studentId", user._id);
    formData.append("email", user.email);
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      await API.post("/applications", formData);

      alert("Application Submitted Successfully");
      setForm({
        name: user?.name || "",
        college: "",
        education: "",
        skills: "",
        phone: "",
        linkedin: "",
        github: "",
        coverLetter: "",
      });
      setResumeFile(null);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div className="apply-container">
        <div className="apply-card">
          <h2>Apply For Job</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="college"
              placeholder="College Name"
              value={form.college}
              onChange={handleChange}
              required
            />

            <input
              name="education"
              placeholder="Education"
              value={form.education}
              onChange={handleChange}
            />

            <input
              name="skills"
              placeholder="Skills"
              value={form.skills}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              name="linkedin"
              placeholder="LinkedIn Link"
              value={form.linkedin}
              onChange={handleChange}
              required
            />

            <input
              name="github"
              placeholder="GitHub Link"
              value={form.github}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />

            <textarea
              name="coverLetter"
              placeholder="Cover Letter"
              rows="5"
              value={form.coverLetter}
              onChange={handleChange}
              required
            />

            <button type="submit">Apply Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
