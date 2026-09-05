"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useState } from "react"; // ⬅️ useState اضافه شد
import "./editor.css";
import { editorExtensions } from "./extensions";
import { Toolbar } from "./Toolbar";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [, forceRender] = useState(0); // ⬅️ فقط یه محرک برای رندر دوباره

  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "rich-editor min-h-[280px] focus:outline-none px-5 py-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    onSelectionUpdate: () => {
      console.log("🔵 selection update called");
      forceRender((n) => n + 1);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const currentContent = editor.getHTML();
    if (value !== currentContent) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-gray bg-white shadow-sm">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
