import React from 'react';

interface EmailListItemProps {
    photo: string;
    name: string;
    date: string;
    subject: string;
    isActive: boolean;
    click: () => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ photo, name, date, subject, isActive, click }) => {
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
                    {subject.length > 100 ? `${subject.slice(0, 97)}...` : subject}
                </p>
            </div>
        </div>
    );
};

export default EmailListItem;
