"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (newAutomation: Automation) => void;
}

interface Automation {
    id: number;
    title: string;
    stats: string;
    enabled: boolean;
    smsEnabled: boolean;
    emailEnabled: boolean;
    icon?: React.ReactNode;
}

const defaultMessage = `Hi {{customer.first_name}}, thank you for visiting {{Business Name}} for your {{service name}}. We just wanted to check in to see if everything met your expectations. If there’s anything we can do to improve your experience, please feel free to let us know. Looking forward to serving you again!`;

const CreateAutomationModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
    const [step, setStep] = React.useState<"settings" | "review">("settings");
    const [sendSms, setSendSms] = React.useState(true);
    const [sendEmail, setSendEmail] = React.useState(false);
    const [duringBusinessHours, setDuringBusinessHours] = React.useState(false);
    const [automationTitle, setAutomationTitle] = React.useState("New Automation");
    const [customerName, setCustomerName] = React.useState("John");
    const [businessName, setBusinessName] = React.useState("Acme Corp");
    const [serviceName, setServiceName] = React.useState("Consultation");


    const [message, setMessage] = React.useState(defaultMessage);

    const handleNext = () => setStep("review");
    const handleBack = () => setStep("settings");
    const handleSave = () => {
        const newAutomation: Automation = {
            id: Date.now(), // temporary unique ID
            title: automationTitle,
            stats: "Just now",
            enabled: true,
            smsEnabled: sendSms,
            emailEnabled: sendEmail,
            icon: null,
        };

        onCreate(newAutomation);
        onClose();
        setStep("settings");
    };

    const getParsedMessage = () => {
        return message
            .replace(/{{customer.first_name}}/g, customerName)
            .replace(/{{Business Name}}/g, businessName)
            .replace(/{{service name}}/g, serviceName);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-5xl md:min-w-5xl md:h-auto h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {step === "settings" ? "Create Automation" : "Review Message"}
                    </DialogTitle>
                </DialogHeader>

                {step === "settings" && (
                    <div className="space-y-4 py-4">
                        <div className="flex flex-col">
                            <Label htmlFor="automationTitle">Automation Name</Label>
                            <input
                                id="automationTitle"
                                type="text"
                                value={automationTitle}
                                onChange={(e) => setAutomationTitle(e.target.value)}
                                className="border mt-3 rounded px-2 py-1"
                                placeholder="Enter automation name"
                            />
                        </div>
                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="sms">Send SMS</Label>
                            <Switch id="sms" checked={sendSms} onCheckedChange={setSendSms} />
                        </div>
                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="email">Send Email</Label>
                            <Switch id="email" checked={sendEmail} onCheckedChange={setSendEmail} />
                        </div>
                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="businessHours">Send During Business Hours</Label>
                            <Switch
                                id="businessHours"
                                checked={duringBusinessHours}
                                onCheckedChange={setDuringBusinessHours}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleNext}>Review Message</Button>
                        </div>
                    </div>
                )}

                {step === "review" && (
                    <div className="flex flex-col gap-6 pt-4">
                        {/* Left: Editor */}
                        <div className="flex md:flex-row flex-col justify-between items-start gap-3">
                            <div className="form flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <Label htmlFor="customerName">Customer First Name</Label>
                                    <input
                                        id="customerName"
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="border mt-2 rounded px-2 py-1"
                                        placeholder="Enter customer first name"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="businessName">Business Name</Label>
                                    <input
                                        id="businessName"
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        className="border mt-2 rounded px-2 py-1"
                                        placeholder="Enter business name"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="serviceName">Service Name</Label>
                                    <input
                                        id="serviceName"
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        className="border mt-3 rounded px-2 py-1"
                                        placeholder="Enter service name"
                                    />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="message" className="mb-2 block">Edit Message</Label>
                                    <Textarea
                                        id="message"
                                        className="min-h-[200px]"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>


                            {/* Right: Preview */}
                            <div className="w-full md:w-1/2">
                                {/* <Label className="mb-2 block">Message Preview</Label> */}
                                {/* <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm min-h-[200px]">
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {message}
                                    </div>
                                </div> */}

                                <div className="w-[300px] ml-auto h-[500px] border-4 border-black relative rounded-3xl bg-black/5 p-4 pb-2 flex flex-col justify-end">
                                    <div className="notch h-[25px] w-[150px] bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl">
                                        <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-1 left-2/3 -translate-x-2/3 rounded-full"></div>
                                        <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-1 left-1/3 -translate-x-1/3 rounded-full"></div>
                                    </div>
                                    {/* Message bubble */}
                                    <div className="max-w-[80%] text-sm ml-auto bg-blue-600 text-white rounded-lg rounded-br-none p-3 shadow-md whitespace-pre-wrap">
                                        {/* {message} */}
                                        {getParsedMessage()}
                                    </div>

                                    <div className="widget-button w-[80px] rounded-4xl mt-4 mx-auto h-[4px] bg-gray-400"></div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-center pt-4">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={onClose}>Cancel</Button>
                                <Button onClick={handleSave}>Create Automation</Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateAutomationModal;
