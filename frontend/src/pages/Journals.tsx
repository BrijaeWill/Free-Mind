import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
}

function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Fetch the journal entries
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

  // Delete a journal entry
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://free-mind-2.onrender.com/api/journals/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEntries(entries.filter((entry) => entry._id !== id)); // Remove the deleted journal from state
      } else {
        alert(data.message || "Error deleting journal.");
      }
    } catch (error) {
      alert("Failed to delete the journal.");
    }
  };
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

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
                  <h5 className="card-title">{entry.title}</h5>
                  <p className="card-text">{entry.content}</p>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id={`dropdownMenuButton-${entry._id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BsThreeDots />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${entry._id}`}
                    >
                      {/* Edit option */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(entry._id)} // Trigger edit (navigate to the edit page)
                        >
                          Edit
                        </button>
                      </li>

                      {/* Delete option */}
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDelete(entry._id)} // Trigger delete
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
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
