import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "50%",
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            style: `width: ${attributes.width}; height: auto;`,
          };
        },
        parseHTML: (element) => element.style.width || "50%",
      },
    };
  },
});

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Underline,
  Highlight,
  ResizableImage.configure({
    inline: true,
    allowBase64: false,
    HTMLAttributes: {
      class: "max-w-full rounded-md",
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      class: "text-primary underline",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
  Placeholder.configure({
    placeholder: "متن  را اینجا بنویسید...",
    emptyEditorClass: "is-editor-empty",
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["right", "center", "left", "justify"],
    defaultAlignment: "justify",
  }),
];
