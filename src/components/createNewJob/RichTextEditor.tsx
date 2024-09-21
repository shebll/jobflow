"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);
export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        editorClassName={cn(
          "h-44 max-h-[500px] overflow-scroll rounded-lg border curser-text p-4 cursor-text  ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
          props.editorClassName,
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: { options: ["bold", "italic", "underline"] },
        }}
        {...props}
        editorRef={(r) =>
          typeof ref == "function" ? ref(r) : ref ? (ref.current = r) : null
        }
      ></Editor>
    );
  },
);
