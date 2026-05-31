import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function PostJob() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/jobs",
        {
          ...job,
          recruiterId: user._id
        }
      );

      alert("Job Posted Successfully");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: ""
      });

    } catch (error) {

      console.log(error);

    }
  };

 return (
  <div style={{ display: "flex" }}>

    <Sidebar />

    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >

      <div className="card">

        <h1>Post Job</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
          />

          <input
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
          />

          <input
            name="type"
            placeholder="Internship / Full Time"
            value={job.type}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={job.description}
            onChange={handleChange}
          />

          <button type="submit">
            Post Job
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default PostJob;