import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-t-md p-1 flex items-center flex-wrap gap-x-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
      >
        H2
      </button>
    </div>
  );
};

const MarkdownEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Markdown.configure({
        html: false,
        linkify: true,
        breaks: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-2 focus:outline-none',
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default MarkdownEditor;
