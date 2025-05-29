"use client";

import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { Mail, MessageCircle, Pencil, Zap } from "lucide-react";
import EditAutomationModal from "../../components/edit-modal";
import CreateAutomationModal from "../../components/create-modal";
// Remove Dialog imports since we're using a separate component now

interface Automation {
    id: number;
    title: string;
    stats: string;
    enabled: boolean;
    smsEnabled: boolean;
    emailEnabled: boolean;
    icon?: React.ReactNode;
}

const mockAutomations: Automation[] = [
    {
        id: 1,
        title: "Post job follow up",
        stats: "0 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-blue-600" />,
    },
    {
        id: 2,
        title: "2nd Appointment Reminder",
        stats: "13 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
    {
        id: 3,
        title: "Welcome New Customers",
        stats: "45 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-purple-600" />,
    },
    {
        id: 4,
        title: "Monthly Newsletter",
        stats: "120 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-red-600" />,
    },
    {
        id: 5,
        title: "Birthday Wishes",
        stats: "5 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-pink-600" />,
    },
    {
        id: 6,
        title: "Appointment Confirmation",
        stats: "38 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-yellow-600" />,
    },
    {
        id: 7,
        title: "Payment Reminder",
        stats: "22 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-orange-600" />,
    },
    {
        id: 8,
        title: "Service Feedback Request",
        stats: "11 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-teal-600" />,
    },
    {
        id: 9,
        title: "Renewal Notice",
        stats: "8 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-indigo-600" />,
    },
    {
        id: 10,
        title: "Holiday Greetings",
        stats: "17 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-cyan-600" />,
    },
    {
        id: 11,
        title: "Abandoned Cart Reminder",
        stats: "30 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-lime-600" />,
    },
    {
        id: 12,
        title: "Trial Expiry Alert",
        stats: "6 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-rose-600" />,
    },
    {
        id: 13,
        title: "Weekly Tips",
        stats: "50 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-fuchsia-600" />,
    },
    {
        id: 14,
        title: "Product Update",
        stats: "40 Sent last 30d",
        enabled: true,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-violet-600" />,
    },
    {
        id: 15,
        title: "Event Invitation",
        stats: "12 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-emerald-600" />,
    },
    {
        id: 16,
        title: "Special Discount Offer",
        stats: "25 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-sky-600" />,
    },
    {
        id: 17,
        title: "Order Confirmation",
        stats: "100 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-blue-800" />,
    },
    {
        id: 18,
        title: "Shipping Notification",
        stats: "80 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-green-800" />,
    },
    {
        id: 19,
        title: "Survey Request",
        stats: "14 Sent last 30d",
        enabled: false,
        smsEnabled: false,
        emailEnabled: true,
        icon: <Zap className="text-pink-800" />,
    },
    {
        id: 20,
        title: "Service Cancellation",
        stats: "3 Sent last 30d",
        enabled: true,
        smsEnabled: true,
        emailEnabled: false,
        icon: <Zap className="text-red-800" />,
    },
];


export default function Automation() {
    const [automations, setAutomations] = React.useState<Automation[]>(mockAutomations);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedAutomation, setSelectedAutomation] = React.useState<Automation | null>(null);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    const handleToggle = (id: number) => {
        setAutomations((prev) =>
            prev.map((automation) =>
                automation.id === id ? { ...automation, enabled: !automation.enabled } : automation
            )
        );
    };

    const handleEditClick = (automation: Automation) => {
        setSelectedAutomation(automation);
        setModalOpen(true);
    };

    const deleteAutomation = (id: number) => {
        setAutomations((prev) => prev.filter((automation) => automation.id !== id));
    }

    return (
        <div className="space-y-4">
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2">
                <h1 className="text-2xl font-bold mb-4">Automation Dashboard</h1>
                <Button onClick={() => setCreateModalOpen(true)} asChild className="bg-black text-white hover:bg-gray-800 px-5 py-2 rounded-md cursor-pointer">
                    <a>Create Automation</a>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {automations.map((automation) => (
                    <Card key={automation.id}>
                        <CardContent>
                            <div className="flex w-full items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-muted p-2 rounded-full">
                                        {automation.icon || <Zap className="text-muted-foreground" />}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold h-[70px]">
                                            {automation.title.length > 25
                                                ? automation.title.slice(0, 25) + "..."
                                                : automation.title}
                                        </h2>
                                    </div>
                                </div>

                                <Switch
                                    checked={automation.enabled}
                                    onCheckedChange={() => handleToggle(automation.id)}
                                    className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-300 mt-2"
                                />
                            </div>

                            <p className="text-sm text-muted-foreground flex justify-start items-center gap-3">
                                {automation.stats}
                            </p>
                            <div className="w-[20px] mt-2 mb-8 h-[1px] bg-black"></div>

                            <p className="text-xs mt-1 flex gap-1">
                                {automation.smsEnabled && (
                                    <span className="text-gray-400 mr-2 flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" /> SMS enabled
                                    </span>
                                )}
                                {automation.smsEnabled && automation.emailEnabled && (
                                    <span className="text-gray-400 mr-2">|</span>
                                )}
                                {automation.emailEnabled && (
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Mail className="w-4 h-4" /> Email enabled
                                    </span>
                                )}
                            </p>

                            <Button
                                className="bg-black mt-8 text-sm flex justify-center items-center gap-3 text-white hover:bg-gray-800 px-5 py-2 rounded-md"
                                onClick={() => handleEditClick(automation)}
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Automation
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <EditAutomationModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedAutomation(null);
                }}
                automation={selectedAutomation}
                setAutomation={setSelectedAutomation}
                onDelete={() => {
                    if (selectedAutomation) {
                        deleteAutomation(selectedAutomation.id);
                        setModalOpen(false);
                        setSelectedAutomation(null);
                    }
                }}
            />

            <CreateAutomationModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={(newAutomation) => setAutomations((prev) => [...prev, newAutomation])}
            />
        </div>
    );
}
