
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconAIAssistant, IconX, IconSend } from '../constants.tsx';
import { getAIAssistantReply } from '../services/geminiService.ts';

type Message = {
    sender: 'user' | 'model';
    text: string;
};

const AIAssistant: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const history = [...messages, userMessage].map(msg => ({
            role: msg.sender as 'user' | 'model',
            parts: [{ text: msg.text }]
        }));

        try {
            const replyText = await getAIAssistantReply(history);
            const modelMessage: Message = { sender: 'model', text: replyText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMessage: Message = { sender: 'model', text: t('chat.errorMessage') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
                aria-label={t('aiAssistant.toggle')}
            >
                <IconAIAssistant className="w-8 h-8"/>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 md:bottom-28 md:right-10 z-50 w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-gray-200/50 animate-fade-in-up">
                    <header className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-800">{t('aiAssistant.title')}</h3>
                        <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 hover:text-gray-800">
                            <IconX className="w-6 h-6" />
                        </button>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`px-3 py-2 rounded-xl max-w-[80%] ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex items-end gap-2">
                                <div className="px-3 py-2 rounded-xl bg-gray-200 text-gray-800">
                                     <div className="flex items-center justify-center space-x-1">
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <footer className="p-3 border-t border-gray-200">
                        <form onSubmit={handleSend} className="relative">
                             <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('aiAssistant.placeholder')}
                                className="w-full bg-gray-100 border-transparent rounded-lg py-2 pl-4 pr-12 focus:ring-primary-500 focus:border-primary-500"
                            />
                            <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300">
                                <IconSend className="w-4 h-4" />
                            </button>
                        </form>
                    </footer>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
