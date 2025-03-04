import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditJournal: React.FC = () => {
  const { id } = useParams(); // Get the journal ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Fetch the journal entry when the component mounts
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await fetch(
          `https://free-mind-2.onrender.com/api/journals/${id}`,  // Correct GET request URL
          {
            method:'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);  // Set title and content if successful
          setContent(data.content);
        } else {
          setError("Journal not found.");
        }
      } catch (err) {
        setError("Failed to fetch the journal.");
      }
    };

    fetchJournal();
  }, [id]);  // Re-fetch journal whenever the ID changes

  // Handle the form submission (update journal)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://free-mind-2.onrender.com/api/journals/${id}`,  // Correct PUT request URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, content }),  // Send updated content and title
        }
      );

      if (response.ok) {
        navigate("/dashboard"); // Redirect to the dashboard after successful update
      } else {
        setError("Failed to update the journal.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Journal Entry</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter journal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows={5}
            placeholder="Update your journal content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJournal;
