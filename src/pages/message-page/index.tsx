import React, { useEffect, useState, useRef } from 'react';
import MessageListItem from '../../components/message-list-item';
import { FaBars, FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [messageText, setMessageText] = useState<string>('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<string>('detail');

    const [infoTab, setInfoTab] = useState<boolean>(false);
    const [chatTab, setChatTab] = useState<boolean>(false);

    const fetchMessages = async () => {
        const response = await fetch('/data/messages.json');
        const data = await response.json();
        setMessages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            setSelectedMessage(messages[0]);
        }
    }, [messages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedMessage?.messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim() && attachments.length === 0) return;

        const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'user-001', // You can replace this with your actual user ID
            content: messageText,
            timestamp: new Date().toISOString(),
            attachments: attachments.map(file => ({
                type: file.type.startsWith('image/') ? 'image' : 'file',
                url: URL.createObjectURL(file),
                fileName: file.name
            })),
            status: 'sent'
        };

        const updatedMessages = selectedMessage.messages.concat(newMsg);

        const updatedSelected = {
            ...selectedMessage,
            messages: updatedMessages,
            lastMessage: {
                content: messageText,
                timeAgo: 'Just now'
            }
        };

        const updatedList = messages.map(m =>
            m.contact.id === updatedSelected.contact.id ? updatedSelected : m
        );

        setSelectedMessage(updatedSelected);
        setMessages(updatedList);
        setMessageText('');
        setAttachments([]);
    };

    return (
        <div>
            {
                loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <div className="flex md:flex-row flex-col justify-between items-start gap-3 relative">
                        <div className={`left-panel h-[calc(92vh-100px)] overflow-y-auto border-r border-gray-200 w-3/12 pr-4 ${chatTab ? 'overlapped' : ''}`}>
                            <Button variant={"ghost"} style={{ padding: 0 }} className='btn md:hidden collapse-chat-list mb-3 w-[50px] h-[50px] flex justify-center items-center rounded-full' onClick={() => setChatTab(!chatTab)}>
                                <FaChevronLeft className='text-2xl' />
                            </Button>
                            <div className="flex flex-col w-full gap-2" onClick={() => setChatTab(false)}>
                                {messages.map((message, index) => (
                                    <MessageListItem
                                        key={index}
                                        photo={message?.contact?.avatar}
                                        name={message?.contact?.name}
                                        date={message?.lastMessage?.timeAgo}
                                        message={message?.lastMessage?.content}
                                        isActive={selectedMessage === message}
                                        click={() => setSelectedMessage(message)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="middle-panel h-[calc(92vh-100px)] overflow-hidden w-6/12 pl-5 border-r pr-10 border-gray-200">

                            {selectedMessage && (
                                <div className='h-[calc(92vh-100px)] flex flex-col justify-between items-start w-full'>
                                    <div className="flex flex-col w-full gap-5">
                                        {/* Contact Info */}
                                        <div className="border-b pb-4 flex justify-between items-center w-full">
                                            <div className="flex justify-start items-center gap-3">
                                                {/* chat list */}
                                                <Button variant={"ghost"} style={{ padding: 0 }} className='btn md:hidden block chat-list-toggler' onClick={() => setChatTab(!chatTab)}>
                                                    <FaBars className='text-2xl' />
                                                </Button>
                                                {/* chat list */}
                                                <img src={selectedMessage.contact.avatar} className='w-[60px] h-[60px] rounded-full' alt="" />
                                                <h2 className="text-2xl font-bold">{selectedMessage.contact.name}</h2>
                                            </div>
                                            <div className="text-right lg:hidden block">
                                                <Button variant={"ghost"} style={{ padding: 0 }} className='btn info-toggler-btn' onClick={() => setInfoTab(!infoTab)}>
                                                    <FaInfoCircle className='text-2xl' />
                                                </Button>
                                            </div>

                                            {/* <p className="text-sm text-gray-500">{selectedMessage.contact.email}</p> */}
                                            {/* <p className="text-sm text-gray-500">{selectedMessage.contact.phone}</p> */}
                                            {/* <p className="text-sm text-gray-500">{selectedMessage.contact.location}</p> */}
                                        </div>

                                        {/* Message Thread */}
                                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                                            {selectedMessage.messages.map((msg: any) => {
                                                const isSender = msg.senderId === selectedMessage.contact.id;

                                                return (
                                                    <div
                                                        key={msg.id}
                                                        className={`flex flex-col max-w-[75%] px-4 py-2 rounded-lg ${isSender ? 'self-start bg-gray-100' : 'self-end bg-black text-white'
                                                            }`}
                                                    >
                                                        <p className="text-sm">{msg.content}</p>

                                                        {/* Attachments */}
                                                        {msg.attachments && msg.attachments.length > 0 && (
                                                            <div className="mt-2 flex gap-2 flex-wrap">
                                                                {msg.attachments.map((att: any, idx: number) => (
                                                                    <div key={idx} className="w-32 h-32 overflow-hidden rounded">
                                                                        {att.type === 'image' ? (
                                                                            <img src={att.url} alt={att.fileName} className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <a
                                                                                href={att.url}
                                                                                className="text-blue-600 underline"
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                            >
                                                                                {att.fileName}
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <span className="text-xs text-gray-400 mt-1 text-right">
                                                            {new Date(msg.timestamp).toLocaleString()}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            <div ref={messageEndRef} />
                                        </div>
                                    </div>

                                    {/* Message Input Area */}
                                    <div className="mt-4 w-full border-t border-gray-200 pt-4">
                                        {/* Attachment Preview */}
                                        {attachments.length > 0 && (
                                            <div className="mb-3 flex gap-3 flex-wrap">
                                                {attachments.map((file, index) => (
                                                    <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                                                        {file.type.startsWith('image/') ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gray-100 text-sm text-center p-2">
                                                                📄 {file.name}
                                                            </div>
                                                        )}
                                                        <Button
                                                            variant={"ghost"}
                                                            style={{ padding: 0 }}
                                                            onClick={() =>
                                                                setAttachments((prev) => prev.filter((_, i) => i !== index))
                                                            }
                                                            className="absolute top-1 right-1 bg-white text-black rounded-full text-xs px-1 hover:bg-gray-300"
                                                            title="Remove"
                                                        >
                                                            ✖️
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <form className="flex items-center gap-3" onSubmit={handleSend}>
                                            {/* Attachment Button */}
                                            <label className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition">
                                                📎
                                                <Input
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            const newFiles = Array.from(e.target.files);  // Convert FileList to Array
                                                            setAttachments((prev) => [...prev, ...newFiles]);  // Add the new files to attachments
                                                            e.target.value = ''; // Allow selecting the same file again
                                                        }
                                                    }}
                                                />

                                            </label>

                                            {/* Text Input */}
                                            <Input
                                                type="text"
                                                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                                placeholder="Type your message..."
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                            />

                                            {/* Send Button */}
                                            <Button
                                                variant={"ghost"}
                                                type="submit"
                                                className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                                            >
                                                Send
                                            </Button>
                                        </form>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className={`right-panel w-full lg:w-3/12 p-5 ${infoTab ? 'overlapped' : ''}`}>
                            <div className="info-content">

                                {/* Contact Info */}
                                <div className="flex flex-col items-center border-b pb-4 mb-4">
                                    <img
                                        src={selectedMessage?.contact.avatar}
                                        alt={selectedMessage?.contact.name}
                                        className="w-24 h-24 rounded-full object-cover mb-3"
                                    />
                                    <h3 className="text-xl font-semibold">{selectedMessage?.contact?.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedMessage?.contact?.email}</p>
                                    <p className="text-sm text-gray-500">{selectedMessage?.contact?.phone}</p>
                                    <p className="text-sm text-gray-500">{selectedMessage?.contact?.location}</p>
                                </div>

                                {/* Book Appointment Button */}
                                <Button
                                    onClick={() => {
                                        console.log("Redirect to booking page"); // Add logic for booking
                                    }}
                                    className="bg-blue-600 text-white w-full px-4 py-2 rounded-full hover:bg-blue-500 transition"
                                >
                                    Book an Appointment
                                </Button>



                                <div className="tabs border-t border-grat-200 mt-4 flex gap-4 mb-4">
                                    {/* Tab for Details */}
                                    <Button
                                        variant={"ghost"}
                                        style={{ padding: 0 }}
                                        onClick={() => setActiveTab('detail')}
                                        className={`px-4 py-2 text-lg rounded-none font-semibold ${activeTab === 'detail' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                    >
                                        Details
                                    </Button>

                                    {/* Tab for Marketing */}
                                    <Button
                                        variant={"ghost"}
                                        style={{ padding: 0 }}
                                        onClick={() => setActiveTab('marketing')}
                                        className={`px-4 py-2 text-lg rounded-none font-semibold ${activeTab === 'marketing' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                    >
                                        Marketing
                                    </Button>
                                </div>

                                {/* Tab Content */}
                                {activeTab === 'detail' && (
                                    <div className="flex flex-col gap-5">
                                        {/* Attachments Section */}
                                        <div className="mt-5">
                                            <h4 className="font-semibold text-lg">Attachments</h4>
                                            <div className="mt-2 flex flex-wrap gap-3">
                                                {selectedMessage?.messages
                                                    .flatMap((msg: any) => msg.attachments || []) // Flatten attachments from all messages
                                                    .length > 0 ? (
                                                    selectedMessage?.messages
                                                        .flatMap((msg: any) => msg.attachments || [])
                                                        .map((att: any, idx: number) => (
                                                            <div key={idx} className="w-32 h-32 overflow-hidden rounded">
                                                                {att.type === 'image' ? (
                                                                    <img
                                                                        src={att.url}
                                                                        alt={att.fileName}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <a
                                                                        href={att.url}
                                                                        className="text-blue-600 underline"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        {att.fileName}
                                                                    </a>
                                                                )}
                                                            </div>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500">No attachments available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'marketing' && (
                                    <div className="flex flex-col gap-5">
                                        {/* Marketing Campaigns */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-white">📣</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-lg">Campaign 1</h4>
                                                        <p className="text-sm text-gray-500">Special discount on products</p>
                                                    </div>
                                                </div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <span className="mr-2 text-sm">Active</span>
                                                    <Input type="checkbox" className="toggle" />
                                                </label>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-white">📧</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-lg">Campaign 2</h4>
                                                        <p className="text-sm text-gray-500">New Year Sale Announcement</p>
                                                    </div>
                                                </div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <span className="mr-2 text-sm">Active</span>
                                                    <Input type="checkbox" className="toggle" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Messages;
