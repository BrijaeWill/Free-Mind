import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";

const EditJournal: React.FC = () => {
  const { id } = useParams<{id:string}>(); // Get the journal ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the journal entry when the component mounts
  useEffect(() => {
    console.log("Journal ID from URL:", id);
    if (!id) {
      navigate("/dashboard"); // Redirect if ID is not found
      return;
    }

    const fetchJournal = async () => {
      try {
        const response = await fetch(
          `https://free-mind-2.onrender.com/api/journals/${id}`, // Correct GET request URL
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched journal data:", data); 
          setTitle(data.title);
          setContent(data.content);
          setLoading(false);
        } else {
          setError("Journal not found.");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch the journal.");
        setLoading(false);
      }
    };

    fetchJournal();
  }, [id, navigate]);

  // Handle the form submission (update journal)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://free-mind-2.onrender.com/api/journals/${id}`, // Use PATCH here
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }), // Only send title and content
        }
      );

      if (response.ok) {
        navigate("/dashboard"); // Redirect to dashboard after successful update
      } else {
        setError("Failed to update the journal.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading until data is fetched
  }

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
          <TextEditor content={content} setContent={setContent} id={id ?? null} />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJournal;

