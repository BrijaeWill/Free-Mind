import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import DOMPurify from "dompurify";

const CreateJournal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState<string | null>(null); // 'id' state for backend compatibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let sanitizedContent = DOMPurify.sanitize(content);

    try {
      const response = await fetch("https://free-mind-2.onrender.com/api/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content: sanitizedContent }),
      });

      if (response.ok) {
        const createdJournal = await response.json(); // Get the created journal's data
        setId(createdJournal.id); // Set the 'id' after creation
        navigate("/dashboard"); // ✅ Redirect to dashboard after successful submission
      } else {
        setError("Failed to create journal entry. Try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Write a New Journal Entry</h2>

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
          <TextEditor content={content} setContent={setContent} id={id} /> {/* Pass 'id' */}
        </div>

        <button type="submit" className="btn btn-primary">Save Entry</button>
      </form>
    </div>
  );
};

export default CreateJournal;

