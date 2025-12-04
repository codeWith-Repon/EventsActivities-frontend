'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

const AIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "Hi there! I'm your AI Activity Assistant. Looking for something fun to do this weekend?",
        isUser: false,
      },
    ]
  );
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "That sounds great! Based on your interest, I'd recommend checking out the 'Sunset Hiking Adventure' or the 'Indie Music Night'. Would you like to see more details?",
          isUser: false,
        },
      ]);
    }, 1000);

    setInputValue('');
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end'>
      {/* Chat Modal */}
      {isOpen && (
        <div className='mb-4 w-80 md:w-96 bg-white rounded-2xl border border-white/50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col max-h-[500px]'>
          {/* Header */}
          <div className='bg-linear-to-r from-primary to-primary-light p-4 flex justify-between items-center text-white'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm'>
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className='font-bold text-sm'>AI Assistant</h3>
                <p className='text-[10px] opacity-80'>Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-white/80 hover:text-white transition-colors cursor-pointer'
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className='grow p-4 overflow-y-auto h-80 space-y-3'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isUser
                      ? 'bg-primary text-white rounded-tr-none '
                      : 'bg-white text-muted-foreground shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messageEndRef}></div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className='p-3 bg-white border-t border-gray-100 flex gap-2'
          >
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Ask for recommendations...'
              className='grow bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
            />
            <button
              type='submit'
              className='bg-primary text-white p-2 rounded-xl hover:bg-primary/80 transition-colors cursor-pointer active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed'
              disabled={!inputValue}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-gray-800 text-white'
            : 'bg-linear-to-r from-primary to-accent text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
};
export default AIWidget;
