import React, { useEffect, useState } from "react";

// Define a type for journal entries
interface JournalEntry {
  _id: string;
  content: string;
}

function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch("https://free-mind-2.onrender.com/api/users/journals", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setEntries(data); 
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Failed to load journals.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div>
      <h2>Your Journal</h2>
      {loading ? (
        <p>Loading...</p>
      ) : entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>{entry.content}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
      <button onClick={() => console.log("Add new entry logic here")}>
        Add New Entry
      </button>
    </div>
  );
}

export default Journal;

