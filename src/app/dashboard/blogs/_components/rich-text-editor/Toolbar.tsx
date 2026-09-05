"use client";

import { Editor } from "@tiptap/react";
import { useRef } from "react";
import { uploadEditorImage } from "../../../products/_services/editor-upload.api";
import { ToolbarButton } from "./ToolbarButton";

interface ToolbarProps {
  editor: Editor;
}

export function Toolbar({ editor }: ToolbarProps) {
  console.log("🟢 Toolbar rendered, isActive image:", editor.isActive("image"));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("آدرس لینک را وارد کنید", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await uploadEditorImage(formData);
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error("خطا:", error);
      alert("آپلود عکس ناموفق بود");
    }

    event.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b-2 border-primary bg-gray p-2">
      {/* Undo / Redo */}
      <ToolbarButton
        title="بازگشت"
        onClick={() => editor.chain().focus().undo().run()}
      >
        ↶
      </ToolbarButton>
      <ToolbarButton
        title="دوباره"
        onClick={() => editor.chain().focus().redo().run()}
      >
        ↷
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray" />
      {/* Headings */}
      <ToolbarButton
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray-300" />
      {/* Text formatting */}
      <ToolbarButton
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <u>U</u>
      </ToolbarButton>
      <ToolbarButton
        title="Strike"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton
        title="Highlight"
        active={editor.isActive("highlight")}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        🖍
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray-300" />
      {/* Alignment */}
      <ToolbarButton
        title="راست چین"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        ⇥
      </ToolbarButton>
      <ToolbarButton
        title="وسط چین"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        ≡
      </ToolbarButton>
      <ToolbarButton
        title="چپ چین"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        ⇤
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray-300" />
      {/* Lists */}
      <ToolbarButton
        title="Bullet List"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •
      </ToolbarButton>
      <ToolbarButton
        title="Ordered List"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray-300" />
      {/* Quote */}
      <ToolbarButton
        title="نقل قول"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </ToolbarButton>
      <ToolbarButton
        title="خط جداکننده"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        ―
      </ToolbarButton>
      <div className="mx-0.5 h-6 w-px bg-gray-300" />
      {/* دکمه لینک */}
      <ToolbarButton
        title="لینک"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        🔗
      </ToolbarButton>
      <ToolbarButton
        title="افزودن عکس"
        onClick={() => fileInputRef.current?.click()}
      >
        🖼️
      </ToolbarButton>
      {/* input file مخفی */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      {editor.isActive("image") && (
        <>
          <div className="mx-0.5 h-6 w-px bg-gray-300" />
          <ToolbarButton
            title="سایز خیلی کوچک"
            onClick={() =>
              editor
                .chain()
                .focus()
                .updateAttributes("image", { width: "20%" })
                .run()
            }
          >
            خیلی کوچک
          </ToolbarButton>
          <ToolbarButton
            title="سایز کوچک"
            onClick={() =>
              editor
                .chain()
                .focus()
                .updateAttributes("image", { width: "30%" })
                .run()
            }
          >
            کوچک
          </ToolbarButton>
          <ToolbarButton
            title="سایز متوسط"
            onClick={() =>
              editor
                .chain()
                .focus()
                .updateAttributes("image", { width: "40%" })
                .run()
            }
          >
            متوسط
          </ToolbarButton>
          <ToolbarButton
            title="بزرگ "
            onClick={() =>
              editor
                .chain()
                .focus()
                .updateAttributes("image", { width: "60%" })
                .run()
            }
          >
            بزرگ
          </ToolbarButton>
        </>
      )}
    </div>
  );
}
