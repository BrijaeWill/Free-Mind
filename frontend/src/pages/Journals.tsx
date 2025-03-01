import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "bootstrap/dist/css/bootstrap.min.css";

// Define a type for journal entries
interface JournalEntry {
  _id: string;
  content: string;
}

function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch(
          "https://free-mind-2.onrender.com/api/journals",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("No journals found");
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Journal</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : entries.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {entries.map((entry) => (
            <div className="col" key={entry._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <p className="card-text">{entry.content}</p>
                </div>
                <div className="card-footer text-muted text-end">
                  <small>Last updated just now</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">{message}</div>
      )}
    </div>
  );
}

export default Journal;
