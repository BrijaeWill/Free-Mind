import { useNavigate } from "react-router-dom";
import Journal from "./Journals";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="text-center mt-4">Your Journal Dashboard</h1>
      
      {/* Add New Entry Button */}
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={() => navigate("/create")}>
          + Add New Entry
        </button>
      </div>

      {/* Journal Entries Component */}
      <Journal />
    </div>
  );
}

export default Dashboard;
