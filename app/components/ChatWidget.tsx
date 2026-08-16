"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CURSOR_COLOR } from "@/app/components/CustomCursor";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  text: "Hop in! I'm Hannah's portfolio guide. Ask me anything about her work, process, or experience, or pick a question below to get started down the rabbit hole.",
};

const PRESET_QUESTIONS = [
  "What's Hannah's design process?",
  "What tools and skills does she use?",
  "What kind of roles is she looking for?",
  "Tell me about her UX/UI work.",
  "Tell me about her graphic design work.",
  "How can I get in touch?",
];

async function getReply(message: string, history: ChatMessage[]): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    const data = await res.json();
    return data.reply ?? "Something went wrong, try again in a moment.";
  } catch {
    return "Something went wrong, try again in a moment.";
  }
}

export default function ChatWidget({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [askedPresets, setAskedPresets] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    const latest = latestMessageRef.current;
    if (!container || !latest) return;
    const offset = latest.offsetTop - container.offsetTop;
    container.scrollTo({ top: offset - 8, behavior: "smooth" });
  }, [messages, isTyping]);

  const ask = async (text: string) => {
    if (!text || isTyping) return;

    if (PRESET_QUESTIONS.includes(text)) {
      setAskedPresets((prev) => (prev.includes(text) ? prev : [...prev, text]));
    }

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    const reply = await getReply(text, nextMessages);
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setIsTyping(false);
  };

  const remainingPresets = PRESET_QUESTIONS.filter((q) => !askedPresets.includes(q)).slice(0, 3);

  return (
    <div className={className}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[95] bg-black/30 backdrop-blur-sm"
            />

            {/* Centered panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed top-1/2 left-1/2 z-[96] flex h-[32rem] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
                <p className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-neutral-900">
                  Ask about Hannah
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-lg text-neutral-500 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                >
                  ×
                </button>
              </div>

              {/* Messages — fixed height, no page scroll, only this pane scrolls internally */}
              <div ref={messagesContainerRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    ref={i === messages.length - 1 ? latestMessageRef : undefined}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user" ? "text-white" : "bg-neutral-100 text-neutral-800"
                      }`}
                      style={msg.role === "user" ? { backgroundColor: CURSOR_COLOR } : undefined}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl bg-neutral-100 px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                    </div>
                  </div>
                )}

                {!isTyping && remainingPresets.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {remainingPresets.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-black/20 hover:bg-black/[0.03]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input.trim());
                }}
                className="flex items-center gap-2 border-t border-black/[0.06] p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  className="flex-1 rounded-full bg-black/[0.04] px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: CURSOR_COLOR }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                    <path d="M3 20v-6l8-2-8-2V4l19 8-19 8z" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        data-cursor="Ask about Hannah"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-30 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white/20 sm:text-sm"
      >
        Ask me anything
        <span aria-hidden>→</span>
      </motion.button>
    </div>
  );
}
