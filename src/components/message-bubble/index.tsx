import React from 'react'

interface Message {
    id: string;
    content: string;
    attachments?: { type: string; url: string; fileName: string }[];
    timestamp: number;
}

const MessageBubble = ({ msg, isSender }: { msg: Message; isSender: boolean }) => {
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
    )
}

export default MessageBubble