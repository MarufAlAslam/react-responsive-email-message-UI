import React from 'react'

interface AttachmentProps {
    att: {
        type: 'image' | 'file';
        url: string;
        fileName: string;
    };
}

const Attachment: React.FC<AttachmentProps> = ({ att }) => {
    return (
        <div className="w-32 h-32 overflow-hidden rounded">
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
    )
}

export default Attachment