import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";

const OutputSection = ({ result }: any) => {
  const editorRef: any = useRef();
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(result);
  }, [result]);
  return (
    <>
      <div className=" bg-white shadow-lg border p-5">
        <div className=" flex justify-between items-center">
          <h2 className=" font-medium text-lg">Your Output</h2>
          <Button className=" flex gap-2 mb-1">
            <CopyIcon className="h-4 w-4" /> Copy
          </Button>
        </div>
        <Editor
          initialValue="Your Result Will Appear Here"
          // previewStyle="vertical"
          previewStyle="none"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
          height="450px"
          onChange={() =>
            console.log(editorRef.current.getInstance().getMarkdown())
          }
        />
      </div>
    </>
  );
};

export default OutputSection;
