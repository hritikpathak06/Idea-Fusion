// import React, { useEffect, useRef } from "react";
// // import "@toast-ui/editor/dist/toastui-editor.css";

// // import { Editor } from "@toast-ui/react-editor";
// import { Button } from "../ui/button";
// import { CopyIcon } from "lucide-react";

// // import { Editor } from 'primereact/editor';
// import {Editor} from "primereact/editor"

// const OutputSection = ({ result }: any) => {
//   const editorRef: any = useRef();
//   useEffect(() => {
//     const editorInstance = editorRef.current.getInstance();
//     editorInstance.setMarkdown(result);
//   }, [result]);
//   return (
//     <>
//       <div className=" bg-white shadow-lg border p-5">
//         <div className=" flex justify-between items-center">
//           <h2 className=" font-medium text-lg">Your Output</h2>
//           <Button className=" flex gap-2 mb-1">
//             <CopyIcon className="h-4 w-4" /> Copy
//           </Button>
//         </div>

//         <Editor value="Always bet on Prime!" readOnly style={{ height: '320px' }}
//         /// <reference path="" />
//         ref={editorRef}

//         // onChange={}
//         onChange={() =>
//           console.log(editorRef.current.getInstance().getMarkdown())
//         }
//         />

//         {/* <Editor
//           initialValue="Your Result Will Appear Here"
//           // previewStyle="vertical"
//           previewStyle="none"
//           initialEditType="wysiwyg"
//           useCommandShortcut={true}
//           ref={editorRef}
//           height="450px"
//           onChange={() =>
//             console.log(editorRef.current.getInstance().getMarkdown())
//           }
//         /> */}
//       </div>
//     </>
//   );
// };

// export default OutputSection;

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";
import { Editor } from "primereact/editor";

const OutputSection = ({ result }: { result: string }) => {
  const [editorContent, setEditorContent] = useState(result);

  useEffect(() => {
    setEditorContent(result);
  }, [result]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(editorContent)
      .then(() => alert("Content copied to clipboard"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const customModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div className="bg-white shadow-lg border p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Your Output</h2>
        <Button className="flex gap-2" onClick={handleCopy}>
          <CopyIcon className="h-4 w-4" /> Copy
        </Button>
      </div>
      <Editor
        value={editorContent}
        onTextChange={(e) => setEditorContent(e.htmlValue || "")}
        style={{ height: "320px" }}
        modules={customModules}
        readOnly={false}
      />
    </div>
  );
};

export default OutputSection;
