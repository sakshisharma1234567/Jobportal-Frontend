import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ResumeViewer() {

  const location = useLocation();

  const resumeUrl =
    location.state?.resume;

  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px"
        }}
      >

        <h2>Resume</h2>

        <button
          onClick={() =>
            window.open(
              resumeUrl,
              "_blank"
            )
          }
        >
          Open Resume
        </button>

      </div>

    </div>
  );
}

export default ResumeViewer;
