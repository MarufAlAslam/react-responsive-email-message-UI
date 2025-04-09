import React from 'react';

interface MessageListItemProps {
    photo: string;
    name: string;
    date: string;
    message: string;
    isActive: boolean;
    click: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ photo, name, date, message, isActive, click }) => {
    return (
        <div
            onClick={click}
            className={`flex cursor-pointer w-full py-3 px-4 rounded-md justify-start items-center gap-3 ${isActive ? 'bg-blue-200' : ''}`}>
            <img src={photo} alt={name} className="w-12 h-12 rounded-full" />
            <div className="content w-full">
                <div className="flex justify-between items-center gap-2">
                    <h3 className='font-bold'>{name}</h3>
                    <p className='text-gray-400 text-sm'>{date}</p>
                </div>
                <p className='text-gray-500 text-sm'>
                    {message.length > 100 ? `${message.slice(0, 97)}...` : message}
                </p>
            </div>
        </div>
    );
};

export default MessageListItem;
