import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Bold, Italic, Strikethrough, Heading1, Heading2, Code, Quote } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    { name: 'bold', icon: Bold, action: () => editor.chain().focus().toggleBold().run() },
    { name: 'italic', icon: Italic, action: () => editor.chain().focus().toggleItalic().run() },
    { name: 'strike', icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run() },
    { name: 'heading1', icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActiveName: 'heading', isActiveAttrs: { level: 1 } },
    { name: 'heading2', icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActiveName: 'heading', isActiveAttrs: { level: 2 } },
    { name: 'codeBlock', icon: Code, action: () => editor.chain().focus().toggleCodeBlock().run() },
    { name: 'blockquote', icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run() },
  ];

  return (
    // Toolbar is now transparent, inheriting the parent's background.
    <div className="bg-transparent pb-2">
      <div className="flex items-center flex-wrap gap-x-1">
        {buttons.map(button => {
          const Icon = button.icon;
          const isActive = button.isActiveName ? editor.isActive(button.isActiveName, button.isActiveAttrs) : editor.isActive(button.name);
          return (
            <button
              key={button.name}
              type="button"
              onClick={button.action}
              className={cn(
                  'p-2 rounded transition-colors',
                  isActive ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              )}
              title={button.name}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
      {/* Separator line, not full-width due to parent padding */}
      <div className="mt-2 border-b border-zinc-200 dark:border-zinc-700"></div>
    </div>
  );
};

const MarkdownEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { languageClassPrefix: 'language-' },
      }),
      Markdown.configure({
        html: false,
        linkify: true,
        breaks: true,
      }),
      Placeholder.configure({
        placeholder: 'Ketikan catatan disini...',
        emptyEditorClass: 'is-empty',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base dark:prose-invert max-w-none focus:outline-none flex-grow',
        'data-placeholder': 'Ketikan catatan disini...',
      },
    },
  });

  return (
    // The entire editor component is transparent
    <div className="flex flex-col flex-grow h-full bg-transparent">
      <MenuBar editor={editor} />
      <div className="flex-grow overflow-y-auto px-1 pb-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MarkdownEditor;