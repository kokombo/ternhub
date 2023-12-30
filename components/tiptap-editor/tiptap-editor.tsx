"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],

    content: "<li> Now Now</li>",
  });

  return (
    <EditorContent
      editor={editor}
      className="max-h-[400px] w-[700px] border-[1px] border-gray text-base p-5"
    />
  );
};

export default TipTapEditor;
