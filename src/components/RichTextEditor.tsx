"use client";

import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useId, useRef, useState } from "react";

type RichTextEditorProps = {
  id: string;
  labelId: string;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  resetTrigger?: number;
  onChange: (html: string, plainText: string) => void;
};

const btnBase =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2.5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-40";
const btnIdle = "text-cream/85 hover:bg-white/10 hover:text-cream";
const btnActive = "bg-gold text-ink";

export function RichTextEditor({
  id,
  labelId,
  placeholder = "Share your tips, favorite spots or a night out worth telling.",
  invalid = false,
  describedBy,
  resetTrigger = 0,
  onChange,
}: RichTextEditorProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoId = useId();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
        bulletList: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        italic: false,
        link: false,
        orderedList: false,
        strike: false,
        underline: false,
        heading: { levels: [3] },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-labelledby": labelId,
        class: "tiptap-editor tallee-prose px-4 py-3 text-cream",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML(), ed.getText());
    },
  });

  useEffect(() => {
    if (!editor || !resetTrigger) return;
    editor.commands.clearContent(false);
  }, [editor, resetTrigger]);

  useEffect(() => {
    if (!infoOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!infoRef.current?.contains(e.target as Node)) {
        setInfoOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [infoOpen]);

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) {
        return { bold: false, heading: false };
      }
      return {
        bold: ed.isActive("bold"),
        heading: ed.isActive("heading", { level: 3 }),
      };
    },
  });

  return (
    <div
      className={`relative mt-2 rounded-lg border bg-white/[0.04] transition-colors focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30 ${invalid ? "border-red-400" : "border-cream/20 hover:border-cream/40"
        }`}
      aria-describedby={describedBy}
    >
      {/* Top Bar: Bold (B), Heading H3 (H), and top-right Info (i) */}
      <div className="flex items-center justify-between rounded-t-lg border-b border-cream/15 bg-charcoal/80 px-2.5 py-1.5">
        <div role="toolbar" aria-label="Text formatting" className="flex items-center gap-1.5">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            aria-label="Bold"
            aria-pressed={state?.bold ?? false}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`${btnBase} ${state?.bold ? btnActive : btnIdle}`}
          >
            B
          </button>
          <button
            type="button"
            title="Heading (H3)"
            aria-label="Heading"
            aria-pressed={state?.heading ?? false}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${btnBase} font-display text-sm ${state?.heading ? btnActive : btnIdle}`}
          >
            H
          </button>
        </div>

        {/* Info icon at top-right corner of the field */}
        <div ref={infoRef} className="relative">
          <button
            type="button"
            aria-label="Formatting tips"
            aria-expanded={infoOpen}
            aria-controls={infoId}
            onClick={() => setInfoOpen((open) => !open)}
            className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-gold ${infoOpen
                ? "border-gold bg-gold text-ink"
                : "border-cream/30 text-cream/80 hover:border-gold hover:text-gold"
              }`}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {infoOpen && (
            <div
              id={infoId}
              role="region"
              aria-label="Formatting tips"
              className="absolute right-0 top-9 z-30 w-64 rounded-xl border border-gold/40 bg-ink p-3.5 text-xs leading-relaxed text-cream shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
            >
              <p className="font-bold uppercase tracking-wider text-gold">Formatting tips</p>
              <ul className="mt-2 space-y-1.5 text-cream/90">
                <li>
                  <strong className="text-gold">Bold / Highlight:</strong> Select text and press{" "}
                  <kbd className="rounded border border-cream/25 bg-white/10 px-1 py-0.5 font-mono text-[11px]">Ctrl + B</kbd>{" "}
                  or click <strong className="text-cream">B</strong>.
                </li>
                <li>
                  <strong className="text-gold">Heading:</strong> Click <strong className="text-cream">H</strong> to toggle an H3 heading.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Editable Canvas */}
      <EditorContent editor={editor} />
    </div>
  );
}
