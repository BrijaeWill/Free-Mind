import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import DOMPurify from "dompurify";

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
  id: string | null;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, setContent, id }) => {
  const [autoSaveTimer, setAutoSaveTimer] = useState<number | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your thoughts...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      let updatedContent = editor.getHTML();
      updatedContent = DOMPurify.sanitize(updatedContent);
      setContent(updatedContent);

      if (id && updatedContent.trim() !== "") {
        if (autoSaveTimer) clearTimeout(autoSaveTimer);

        const timer = window.setTimeout(() => {
          autoSaveContent(updatedContent, id);
        }, 2000); // 2-second delay

        setAutoSaveTimer(timer);
      }
    },
  });

  const autoSaveContent = async (content: string, id: string) => {
    try {
      const response = await fetch(`https://free-mind-2.onrender.com/api/journals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-save content");
      }

      const savedJournal = await response.json();
      console.log("Journal auto-saved successfully:", savedJournal);
    } catch (error) {
      console.error("Error saving journal:", error);
    }
  };

  if (!editor) return null;

  return (
    <div className="editor-container border p-2 rounded">
      <div className="mb-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="btn btn-sm btn-secondary">
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="btn btn-sm btn-secondary">
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn btn-sm btn-secondary">
          H1
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn btn-sm btn-secondary">
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn btn-sm btn-secondary">
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn btn-sm btn-secondary">
          Bullet List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn btn-sm btn-secondary">
          Numbered List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
