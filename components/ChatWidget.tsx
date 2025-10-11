"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Send, X } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Chat');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Chat API error:", text);
        throw new Error("Chat API failed");
      }

      const data = await res.json();
      if (!data?.reply) throw new Error("Empty reply");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Error parsing response:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t('error') },
      ]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Toggle Button - Hidden when chat is open */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            filter-toggle-button
            filter-toggle-button--inactive
            filter-toggle-button--visited
          "
        >
          {t('button')}
        </motion.button>
      )}

      {/* Inline Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              bg-black/40 backdrop-blur-md
              border-2 border-white/30
              rounded-lg overflow-hidden
              p-6
              w-80 h-96
              shadow-lg
              flex flex-col
            "
          >
            {/* Header */}
            <div className="
              flex justify-between items-center
              py-4
              border-b-2 border-white/30
            ">
              <h3 className="
                text-lg font-semibold
                text-white
              ">
                {t('title')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="
                  text-white/70 hover:text-white
                  p-1
                  rounded
                  hover:bg-white/10
                  transition-colors
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat messages */}
            <div
              ref={chatRef}
              className="
                flex-1 overflow-y-auto
                space-y-4 py-4
                text-sm
                scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
              "
            >
              {messages.length === 0 && (
                <div className="
                  text-center
                  py-8
                  text-white/60 text-base
                ">
                  {t('placeholder')}
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                    px-4 py-3
                    rounded-2xl max-w-[80%]
                    ${m.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                    }
                  `}
                  >
                    <div className="
                      text-xs
                      opacity-70
                      mb-1
                    ">
                      {m.role === "user" ? t('user') : t('assistant')}
                    </div>
                    <div className="leading-relaxed">{m.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="
                flex items-center gap-3
                py-4
                border-t-2 border-white/30
              "
            >
              <input
                className="
                  flex-1 bg-transparent
                  text-center
                  text-white placeholder-white/50 text-sm
                  outline-none
                "
                placeholder={t('inputPlaceholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="
                  p-2
                  rounded
                  bg-[var(--color-visited)]
                  hover:bg-[var(--color-visited)]/80
                  shadow-md hover:shadow-lg
                  transition-all duration-200
                "
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
