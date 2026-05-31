import { useNavigate } from "react-router-dom";

function JobCard({ job, onDelete }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  return (
    <div className="job-card">

      <h3>{job.title}</h3>

      <p>
        <strong>Company:</strong>{" "}
        {job.company}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {job.location}
      </p>

      <p>
        <strong>Salary:</strong>{" "}
        {job.salary}
      </p>

      <p>
        <strong>Type:</strong>{" "}
        {job.type}
      </p>

      <div className="job-actions">

        {user?.role === "student" && (

          <button
            className="apply-btn"
            onClick={() =>
              navigate(
                `/apply/${job._id}`
              )
            }
          >
            Apply
          </button>

        )}

        {user?.role === "recruiter" && (

          <button
            className="delete-btn"
            onClick={() =>
              onDelete(job._id)
            }
          >
            Delete
          </button>

        )}

      </div>

    </div>
  );
}

export default JobCard;