import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/geminiService';

interface ChatAssistantProps {
    brandName: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ brandName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        const geminiHistory = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const response = await chatWithGemini(userMsg, `Brand Focus: ${brandName}`, geminiHistory);
        
        setMessages(prev => [...prev, { role: 'model', text: response || "Sorry, I couldn't process that." }]);
        setIsTyping(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-brand-600 hover:bg-brand-500 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
                >
                    <i className="fa-solid fa-message text-white text-xl"></i>
                </button>
            )}

            {isOpen && (
                <div className="w-80 md:w-96 bg-dark-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="bg-dark-900 p-4 border-b border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                            <span className="font-semibold text-white">Gemini Creative Aide</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-10 text-sm">
                                <p>Ask me about ad hooks, script ideas, or why certain ads work well for {brandName}!</p>
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                    m.role === 'user' 
                                        ? 'bg-brand-600 text-white rounded-br-none' 
                                        : 'bg-gray-700 text-gray-200 rounded-bl-none'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 rounded-2xl rounded-bl-none px-4 py-2 flex gap-1">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-700 bg-dark-900">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about creative strategy..."
                                className="w-full bg-dark-800 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-brand-500"
                            />
                            <button 
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-brand-500 hover:text-brand-400"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
