import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", text: "Welcome to Luxe Estates. How can I assist you with your property search today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const response = await chatMutation.mutateAsync(userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", text: response.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", text: "I apologize, I'm currently unable to connect. Please try again later." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="overflow-hidden shadow-2xl border-none">
              <div className="bg-primary p-4 flex justify-between items-center text-white">
                <div>
                  <h3 className="font-serif font-semibold">Luxe Concierge</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[80%] p-3 text-sm rounded-lg",
                      msg.role === "user" 
                        ? "bg-primary text-white self-end rounded-br-none" 
                        : "bg-white text-gray-800 shadow-sm self-start rounded-bl-none border border-gray-100"
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="self-start bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-1">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200" />
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Type a message..." 
                  className="border-none bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button size="icon" type="submit" disabled={chatMutation.isPending || !input.trim()} className="rounded-full h-10 w-10 shrink-0">
                  <Send size={18} />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
