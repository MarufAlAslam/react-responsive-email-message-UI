import React, { useEffect, useState, useRef } from 'react';
import EmailListItem from '../../components/email-list-item';
import { FaBars, FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import MessageBubble from '../../components/message-bubble';
import Attachment from '../../components/attachment';


const Emails: React.FC = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [emailText, setEmailText] = useState<string>('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<string>('detail');
  const emailEndRef = useRef<HTMLDivElement>(null);

  const [infoTab, setInfoTab] = useState<boolean>(false);
  const [chatTab, setChatTab] = useState<boolean>(false);

  const fetchEmails = async () => {
    const response = await fetch('/data/emails.json');
    const data = await response.json();
    setEmails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  useEffect(() => {
    if (emails.length > 0) {
      setSelectedEmail(emails[0]);
    }
  }, [emails]);

  useEffect(() => {
    if (emailEndRef.current) {
      emailEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedEmail?.emails]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailText.trim() && attachments.length === 0) return;

    const newEmail = {
      id: `email-${Date.now()}`,
      senderId: 'user-001', // Replace with actual user ID
      subject: 'Re: ' + selectedEmail.lastEmail.subject,
      content: emailText,
      timestamp: new Date().toISOString(),
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        fileName: file.name
      })),
      status: 'sent'
    };

    const updatedEmails = selectedEmail.emails.concat(newEmail);

    const updatedSelected = {
      ...selectedEmail,
      emails: updatedEmails,
      lastEmail: {
        subject: newEmail.subject,
        content: newEmail.content,
        timeAgo: 'Just now'
      }
    };

    const updatedList = emails.map(e =>
      e.contact.id === updatedSelected.contact.id ? updatedSelected : e
    );

    setSelectedEmail(updatedSelected);
    setEmails(updatedList);
    setEmailText('');
    setAttachments([]);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col justify-between items-start gap-3 relative">
          {/* Left Panel: Email List */}
          <div className={`left-panel h-[calc(92vh-100px)] overflow-y-auto border-r border-gray-200 w-3/12 pr-4 ${chatTab ? 'overlapped' : ''}`}>
            <Button variant={"ghost"} style={{ padding: 0 }} className='btn md:hidden collapse-chat-list mb-3 w-[50px] h-[50px] flex justify-center items-center rounded-full' onClick={() => setChatTab(!chatTab)}>
              <FaChevronLeft className='text-2xl' />
            </Button>
            <div className="flex flex-col w-full gap-2" onClick={() => setChatTab(false)}>
              {emails.map((email, index) => (
                <EmailListItem
                  key={index}
                  photo={email?.contact?.avatar}
                  name={email?.contact?.name}
                  date={email?.lastEmail?.timeAgo}
                  subject={email?.lastEmail?.subject}
                  isActive={selectedEmail === email}
                  click={() => setSelectedEmail(email)}
                />
              ))}
            </div>
          </div>

          {/* Middle Panel: Email Thread */}
          <div className="middle-panel h-[calc(92vh-100px)] w-6/12 pl-5 pr-10 border-r border-gray-200">
            {selectedEmail && (
              <div className='h-[calc(92vh-100px)] flex flex-col justify-between items-start'>
                <div className="flex w-full flex-col gap-5">
                  {/* Contact Info */}
                  <div className="border-b pb-4 flex justify-between items-center w-full">

                    <div className="flex justify-start items-center gap-3">
                      {/* chat list */}
                      <Button variant={"ghost"} style={{ padding: 0 }} className='btn md:hidden block chat-list-toggler p-0' onClick={() => setChatTab(!chatTab)}>
                        <FaBars className='text-2xl' />
                      </Button>
                      {/* chat list */}
                      <img src={selectedEmail.contact.avatar} className="w-[60px] h-[60px] rounded-full" alt="" />
                      <h2 className="text-2xl font-bold">{selectedEmail.contact.name}</h2>
                    </div>
                    <div className="text-right lg:hidden block">
                      <Button variant={"ghost"} style={{ padding: 0 }} className='btn info-toggler-btn' onClick={() => setInfoTab(!infoTab)}>
                        <FaInfoCircle className='text-2xl' />
                      </Button>
                    </div>
                  </div>

                  {/* Email Thread */}
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    {selectedEmail.emails.map((email: any) => {
                      const isSender = email.senderId === selectedEmail.contact.id;

                      return (
                        <MessageBubble msg={email} key={email.id} isSender={isSender} />
                      );
                    })}
                    <div ref={emailEndRef} />
                  </div>
                </div>

                {/* Email Input Area */}
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
                          style={{ padding: 0 }}
                            variant={"ghost"}
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
                      placeholder="Type your email..."
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                    />

                    {/* Send Button */}
                    <Button
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

          {/* Right Panel: Email Sender Info */}
          <div className={`right-panel w-full lg:w-3/12 p-5 ${infoTab ? 'overlapped' : ''}`}>

            {/* Contact Info */}
            <div className="flex flex-col items-center border-b pb-4 mb-4">
              <img
                src={selectedEmail?.contact?.avatar}
                alt={selectedEmail?.contact?.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold">{selectedEmail?.contact?.name}</h3>
              <p className="text-sm text-gray-500">{selectedEmail?.contact?.email}</p>
              <p className="text-sm text-gray-500">{selectedEmail?.contact?.phone}</p>
              <p className="text-sm text-gray-500">{selectedEmail?.contact?.location}</p>
            </div>

            {/* Book Appointment Button */}
            <Button
              onClick={() => {
                console.log("Redirect to booking page"); // Add logic for booking
              }}
              className="bg-blue-600 w-full text-white px-4 py-2 rounded-full hover:bg-blue-500 transition"
            >
              Book an Appointment
            </Button>

            <div className="tabs border-t border-grat-200 mt-4 flex gap-4 mb-4">
              {/* Tab for Details */}
              <Button
                variant={"ghost"}
                style={{ padding: 0 }}
                onClick={() => setActiveTab('detail')}
                className={`px-4 py-2 rounded-none text-lg font-semibold ${activeTab === 'detail' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
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
            {activeTab === 'detail' && selectedEmail && (
              <div className="flex flex-col gap-5">

                {/* Attachments Section */}
                <div className="mt-5">
                  <h4 className="font-semibold text-lg">Attachments</h4>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {selectedEmail?.emails
                      .flatMap((email: any) => email.attachments || []) // Flatten attachments from all emails
                      .length > 0 ? (
                      selectedEmail?.emails
                        .flatMap((email: any) => email.attachments || [])
                        .map((att: any, idx: number) => (
                          <Attachment key={idx} att={att} />
                        ))
                    ) : (
                      <p className="text-sm text-gray-500">No attachments</p>
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
      )}
    </div>
  );
};

export default Emails;
