"use client";
import { useState, type FC } from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
// import "draft-js/dist/Draft.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";

const DraftEditor: FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const toolbarPlugin = createToolbarPlugin();

  return (
    <div className="h-[500px] w-[500px] border-2 border-black">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[toolbarPlugin]}
      />
    </div>
  );
};

export default DraftEditor;
