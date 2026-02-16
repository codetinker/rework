import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Circle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to RWNA Engineering. How can we help you with our subsea and on-site machining solutions today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  // Check if current time is within working hours
  const isWithinWorkingHours = () => {
    const now = new Date();
    const malaysiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kuala_Lumpur"}));
    const day = malaysiaTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = malaysiaTime.getHours();
    
    // Working hours: Monday (1) to Saturday (6), 08:00 to 17:00
    const isWorkingDay = day >= 1 && day <= 6;
    const isWorkingHour = hour >= 8 && hour < 17;
    
    return isWorkingDay && isWorkingHour;
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your inquiry. One of our engineers will be with you shortly. For urgent technical support, please contact our Kuantan headquarters.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                    <User className="w-6 h-6" />
                  </div>
                  <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500 stroke-[4px] stroke-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none">RWNA Support</h3>
                  <p className="text-xs opacity-80 mt-1">Online | Engineering Specialist</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-accent/5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-secondary-foreground rounded-bl-none border border-border'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 opacity-60 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Working Hours Warning */}
            {!isWithinWorkingHours() && (
              <div className="px-4 py-3 bg-amber-50 border-t border-amber-200 text-amber-800 text-xs">
                <div className="font-semibold mb-1">Live Chat Session</div>
                <div className="mb-1">08:00 - 17:00 (UTC+08:00) Malaysia</div>
                <div className="mb-1">Monday to Saturday</div>
                <div>Any inquiries beyond the session time will be addressed in the next working day.</div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-card border-t border-border flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-secondary/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:shadow-primary/20 transition-shadow relative"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
