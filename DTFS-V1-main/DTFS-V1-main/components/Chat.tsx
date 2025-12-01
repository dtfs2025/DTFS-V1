import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Conversation, ChatMessage, FileAttachment } from '../types.ts';
import { IconSearch, IconPaperclip, IconSend, IconCheckDone, IconMic, IconVideo, IconFilePdf, IconFileDescription, IconX, IconPhoneOff, IconVideoOff, IconMicOff, IconChevronLeft } from '../constants.tsx';
import { generateChatReply, generateChatSuggestions } from '../services/geminiService.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { CONVERSATIONS, CHAT_MESSAGES } from '../constants.tsx';

type ChatHistory = { role: 'user' | 'model', parts: { text: string }[] };

const FileMessage: React.FC<{file: FileAttachment}> = ({ file }) => {
    const getFileIcon = () => {
        switch(file.type) {
            case 'pdf': return <IconFilePdf className="w-6 h-6 text-red-500" />;
            default: return <IconFileDescription className="w-6 h-6 text-gray-500" />;
        }
    }
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-200/50 rounded-lg">
            <div className="flex-shrink-0">{getFileIcon()}</div>
            <div>
                <p className="font-semibold text-sm text-gray-800 break-all">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
            </div>
        </div>
    )
};

const VoiceMessage: React.FC<{duration: string}> = ({ duration }) => (
    <div className="flex items-center gap-2">
         <button className="p-2 bg-white rounded-full text-primary-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
        </button>
        <div className="flex items-center gap-0.5 w-32 h-6">
            {[...Array(25)].map((_, i) => (
                <div key={i} className="w-0.5 bg-white/80 rounded-full" style={{height: `${Math.random() * 80 + 20}%`}}></div>
            ))}
        </div>
        <span className="text-xs font-mono">{duration}</span>
    </div>
);

const VideoCallModal: React.FC<{ contactName: string, onClose: () => void }> = ({ contactName, onClose }) => {
    const {t} = useTranslation();
    return (
        <div className="fixed inset-0 bg-gray-900/90 z-50 flex flex-col items-center justify-center animate-fade-in">
            <div className="absolute top-5 right-5 text-white">
                <p className="font-semibold">{contactName}</p>
                <p className="text-sm text-gray-300">{t('chat.videoCallInProgress')}</p>
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Contact's video */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="w-40 h-40 bg-secondary-400 rounded-full text-white flex items-center justify-center text-6xl font-bold">
                        {contactName[0]}
                    </div>
                </div>
                 {/* User's video */}
                <div className="absolute bottom-6 right-6 w-40 h-28 bg-primary-500 rounded-lg shadow-lg border-2 border-white"></div>
            </div>

            <div className="absolute bottom-10 flex items-center gap-6">
                 <button className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30"><IconMic className="w-6 h-6"/></button>
                 <button className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30"><IconVideo className="w-6 h-6"/></button>
                 <button onClick={onClose} className="p-5 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-lg"><IconPhoneOff className="w-8 h-8"/></button>
                 <button className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30"><IconMicOff className="w-6 h-6"/></button>
                 <button className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30"><IconVideoOff className="w-6 h-6"/></button>
            </div>
        </div>
    )
};


const Chat: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [selectedConversationId, setSelectedConversationId] = useState<string>('1');
    const [allMessages, setAllMessages] = useState<{ [key: string]: ChatMessage[] }>(CHAT_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isVideoCallOpen, setVideoCallOpen] = useState(false);
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedConversation = CONVERSATIONS.find(c => c.id === selectedConversationId);
    const messages = allMessages[selectedConversationId] || [];

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, suggestions, isGeneratingSuggestions]);
    
    const handleSelectConversation = (id: string) => {
        setSelectedConversationId(id);
        setSuggestions([]);
        if (window.innerWidth < 768) { // md breakpoint
            setMobileView('chat');
        }
    };

    const handleSendMessage = useCallback(async (messageContent: string) => {
        if (!messageContent.trim() || !selectedConversation || !user) return;

        setSuggestions([]);
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            sender: 'user',
            content: messageContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
        };
        
        let historyForAI: ChatHistory[] = [];
        const currentMessages = allMessages[selectedConversationId] || [];
        const newMessages = [...currentMessages, userMessage];
        setAllMessages(prev => ({ ...prev, [selectedConversationId]: newMessages }));
        
        historyForAI = newMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content || `[${msg.file ? 'file' : 'voice note'}]` }]
        }));

        setNewMessage('');
        setIsReplying(true);

        try {
            const replyContent = await generateChatReply(selectedConversation, historyForAI);
            
            const contactMessage: ChatMessage = {
                id: `contact-${Date.now()}`,
                sender: 'contact',
                content: replyContent,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            // Mark user messages as read and add the new contact message
            setAllMessages(prev => {
                const currentMessages = prev[selectedConversationId] || [];
                const updatedMessages = currentMessages.map(m => m.sender === 'user' ? { ...m, isRead: true } : m);
                return { ...prev, [selectedConversationId]: [...updatedMessages, contactMessage] };
            });
            
            // Generate suggestions based on the AI reply
            setIsGeneratingSuggestions(true);
            const historyForSuggestions = [...historyForAI, { role: 'model', parts: [{ text: replyContent }] }] as ChatHistory[];
            try {
                const suggestionResult = await generateChatSuggestions(selectedConversation, historyForSuggestions, user.role);
                setSuggestions(suggestionResult);
            } catch (suggestionError) {
                console.error("Failed to get AI suggestions:", suggestionError);
                setSuggestions([]);
            } finally {
                setIsGeneratingSuggestions(false);
            }

        } catch (error) {
            console.error("Failed to get AI reply:", error);
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                sender: 'contact',
                content: t('chat.errorMessage'),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setAllMessages(prev => {
                const currentMessages = prev[selectedConversationId] || [];
                return { ...prev, [selectedConversationId]: [...currentMessages, errorMessage] };
            });
        } finally {
            setIsReplying(false);
        }
    }, [selectedConversation, selectedConversationId, t, allMessages, user]);

    const handleSendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSuggestions([]);
        const fileMessage: ChatMessage = {
            id: `file-${Date.now()}`,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: {
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                type: 'generic'
            }
        };
        setAllMessages(prev => {
            const currentMessages = prev[selectedConversationId] || [];
            return { ...prev, [selectedConversationId]: [...currentMessages, fileMessage] };
        });
    };
    
    const handleSendVoiceNote = () => {
        setSuggestions([]);
        const voiceNoteMessage: ChatMessage = {
            id: `voice-${Date.now()}`,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            voiceNote: {
                duration: `0:${Math.floor(Math.random() * 50 + 10)}`
            }
        };
        setAllMessages(prev => {
            const currentMessages = prev[selectedConversationId] || [];
            return { ...prev, [selectedConversationId]: [...currentMessages, voiceNoteMessage] };
        });
    }

    const handleSuggestionClick = (suggestion: string) => {
        setNewMessage(suggestion);
        inputRef.current?.focus();
    };
    
    return (
        <>
        {isVideoCallOpen && selectedConversation && <VideoCallModal contactName={selectedConversation.name} onClose={() => setVideoCallOpen(false)} />}
        <div className="flex h-full bg-white md:rounded-lg md:shadow-sm">
            <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">{t('chat.title')}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map(convo => (
                        <div key={convo.id} onClick={() => handleSelectConversation(convo.id)} className={`flex items-start p-4 cursor-pointer border-l-4 transition-colors ${selectedConversationId === convo.id ? 'bg-primary-50 border-primary-500' : 'border-transparent hover:bg-gray-50'}`}>
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg`}>
                                    {convo.avatar}
                                </div>
                                {convo.online && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>}
                            </div>
                            <div className="ml-3 flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-semibold text-gray-800 truncate">{convo.name}</p>
                                    <p className="text-xs text-gray-400 shrink-0">{convo.timestamp}</p>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{t(`nav.${convo.role}`)} {convo.tradeId && `- ${convo.tradeId}`}</p>
                                <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`w-full md:w-2/3 flex flex-col ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                             <div className="flex items-center">
                                <button onClick={() => setMobileView('list')} className="md:hidden mr-2 p-1 text-gray-500 hover:text-primary-600">
                                    <IconChevronLeft className="w-6 h-6" />
                                </button>
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedConversation.name}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        {selectedConversation.online ? <><span className="h-2 w-2 rounded-full bg-green-500"></span><span>{t('chat.online')}</span></> : <span>{t('chat.offline')}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-500">
                                <button onClick={() => setVideoCallOpen(true)} className="hover:text-primary-600"><IconVideo className="w-6 h-6"/></button>
                                <button className="hover:text-primary-600"><IconSearch className="w-6 h-6"/></button>
                            </div>
                        </div>

                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {msg.sender === 'contact' && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                {selectedConversation.avatar}
                                            </div>
                                        )}
                                        <div>
                                            <div className={`px-4 py-3 rounded-2xl max-w-md ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
                                                {msg.content && <p>{msg.content}</p>}
                                                {msg.file && <FileMessage file={msg.file} />}
                                                {msg.voiceNote && <VoiceMessage duration={msg.voiceNote.duration} />}
                                            </div>
                                            <div className={`mt-1 text-xs text-gray-400 flex items-center gap-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <span>{msg.timestamp}</span>
                                                {msg.sender === 'user' && (
                                                    <IconCheckDone className={`w-5 h-5 ${msg.isRead ? 'text-blue-500' : 'text-gray-400'}`} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isReplying && (
                                     <div className="flex items-end gap-3">
                                         <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                                            {selectedConversation.avatar}
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl max-w-md bg-white text-gray-800 rounded-bl-none shadow-sm">
                                            <div className="flex items-center justify-center space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {(isGeneratingSuggestions || suggestions.length > 0) && (
                            <div className="px-4 pt-3 pb-2 border-t border-gray-200 bg-white">
                                {isGeneratingSuggestions ? (
                                    <div className="text-sm text-gray-400 animate-pulse">{t('chat.generatingSuggestions')}</div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {suggestions.map((s, i) => (
                                            <button key={i} onClick={() => handleSuggestionClick(s)} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="p-4 border-t border-gray-200 bg-white">
                             <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(newMessage); }} className="relative flex items-center">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-primary-600">
                                    <IconPaperclip className="w-6 h-6" />
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleSendFile} className="hidden" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(newMessage))}
                                    disabled={isReplying || isRecording}
                                    placeholder={isRecording ? t('chat.recording') : t('chat.placeholder')}
                                    className="flex-1 bg-gray-100 border-transparent rounded-lg py-3 px-4 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-70"
                                />
                                {newMessage ? (
                                    <button type="submit" disabled={!newMessage.trim() || isReplying} className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition disabled:bg-primary-300 disabled:cursor-not-allowed mx-2">
                                        <IconSend className="w-5 h-5" />
                                    </button>
                                ): (
                                    <button type="button" onMouseDown={() => setIsRecording(true)} onMouseUp={() => { setIsRecording(false); handleSendVoiceNote(); }} disabled={isReplying} className={`p-2 rounded-full text-white transition mx-2 ${isRecording ? 'bg-red-500' : 'bg-primary-600 hover:bg-primary-700'}`}>
                                        <IconMic className="w-5 h-5" />
                                    </button>
                                )}
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 hidden md:flex items-center justify-center text-gray-500">
                        <p>{t('chat.selectConversation')}</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default Chat;