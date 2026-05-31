import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";

import "./jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [type, setType] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "recruiter") {
        setJobs(res.data.jobs.filter((job) => job.recruiterId === user._id));
      } else {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);

      setJobs(jobs.filter((job) => job._id !== id));

      alert("Job Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      search === "" ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase());

    const matchLocation =
      location === "" ||
      job.location?.toLowerCase().includes(location.toLowerCase());

    const matchType =
      type === "" || job.type?.toLowerCase().includes(type.toLowerCase());

    return matchSearch && matchLocation && matchType;
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div className="jobs-container">
        <SearchBar search={search} setSearch={setSearch} />

        <Filters
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
        />

        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} onDelete={handleDelete} />
            ))
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              <h2>No Jobs Found</h2>

              <p>Try another search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
