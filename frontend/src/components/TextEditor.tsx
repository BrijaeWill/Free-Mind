import React from "react";
import { useEditor,EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {Heading} from "@tiptap/extension-heading";
//define props type
interface TextEditorProps{
    content: string;
    setContent: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> =({content,setContent}) =>{
    const editor = useEditor({
        extensions:[
        StarterKit,
        Placeholder.configure({
        placeholder: "Write your thoughts...",
        }),
        Heading.configure({
        levels: [1,2,3],
        }),
        ],
        content: content,
        onUpdate: ({editor}) =>{
        setContent(editor.getHTML());
        },
    });
    if (!editor) {
        return null;
      }
    
      return (
        <div className="editor-container border p-2 rounded">
          <div className="mb-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="btn btn-sm btn-secondary"
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="btn btn-sm btn-secondary"
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="btn btn-sm btn-secondary"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="btn btn-sm btn-secondary"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className="btn btn-sm btn-secondary"
            >
              H3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="btn btn-sm btn-secondary"
            >
              Bullet List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="btn btn-sm btn-secondary"
            >
              Numbered List
            </button>
          </div>
          <EditorContent editor={editor} />
        </div>
      );
    }
      
export default TextEditor;