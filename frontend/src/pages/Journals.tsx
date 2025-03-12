import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

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

  // Fetch journal entries
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
  const cleanContent = (content: string) => {
    // Allowed HTML tags configuration
    const allowedTags = ["b", "i", "em", "strong", "h1", "h2", "h3", "ul", "ol", "li", "p"];
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: allowedTags });
  };

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
      if (response.ok) {
        setEntries(entries.filter((entry) => entry._id !== id));
      } else {
        alert("Error deleting journal.");
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
        <div className="row g-4">
          {entries.map((entry) => (
            <div className="card-container col" key={entry._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{entry.title}</h5>
                  <hr />
                  <p dangerouslySetInnerHTML={{ __html: cleanContent(entry.content) }} />
                </div>

                {/* Footer with Dropdown */}
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">Last updated just now</small>

                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle no-border"
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
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(entry._id)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDelete(entry._id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End Footer */}
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
