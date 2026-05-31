import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ResumeViewer() {
  const location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <iframe
          src={location.state?.resume}
          width="100%"
          height="900px"
          title="Resume"
          style={{
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

export default ResumeViewer;
