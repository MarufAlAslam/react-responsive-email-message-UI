import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { Mail, MessageCircle, Pencil, Zap } from "lucide-react";
import { Link } from "react-router-dom";

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
        title: "1st Estimate Follow up",
        stats: "0 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
    {
        id: 4,
        title: "Oil Change Reminder",
        stats: "0 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
    {
        id: 5,
        title: "2nd Estimate Follow up",
        stats: "2 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
    {
        id: 6,
        title: "Inspection Reminder",
        stats: "0 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
    {
        id: 7,
        title: "Review Request",
        stats: "0 Sent last 30d",
        enabled: false,
        smsEnabled: true,
        emailEnabled: true,
        icon: <Zap className="text-green-600" />,
    },
];

export default function Automation() {
    const [automations, setAutomations] = React.useState<Automation[]>(mockAutomations);

    const handleToggle = (id: number) => {
        setAutomations((prev) =>
            prev.map((automation) =>
                automation.id === id ? { ...automation, enabled: !automation.enabled } : automation
            )
        );
    };
    return (
        <div className="space-y-4">
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2">
                <h1 className="text-2xl font-bold mb-4">Automation Dashboard</h1>
                <Link to="/automation/create" className="btn bg-black md:mb-0 mb-6 text-white hover:bg-gray-800 px-5 py-2 rounded-md">
                    Create Automation
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {automations.map((automation) => (
                    <Card key={automation.id}>
                        <CardContent className="">
                            <div className="flex w-full items-start justify-between">
                                {/* Left section: icon and title */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-muted p-2 rounded-full">
                                        {automation.icon || <Zap className="text-muted-foreground" />}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold h-[70px]">{automation.title.length > 25 ? automation.title.slice(0, 25) + "..." : automation.title}</h2>
                                    </div>
                                </div>

                                {/* Right section: toggle*/}
                                <Switch
                                    checked={automation.enabled}
                                    onCheckedChange={() => handleToggle(automation.id)}
                                    className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-300 mt-2"
                                />
                            </div>

                            <p className="text-sm text-muted-foreground flex justify-start items-center gap-3">{automation.stats}</p>
                            <div className="w-[20px] mt-2 mb-8 h-[1px] bg-black"></div>

                            <p className="text-xs mt-1 flex gap-1">
                                {automation.smsEnabled && (
                                    <span className="text-gray-400 mr-2 flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" /> SMS enabled
                                    </span>
                                )}
                                {
                                    automation.smsEnabled && automation.emailEnabled && <span className="text-gray-400 mr-2">|</span>
                                }
                                {automation.emailEnabled && (
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Mail className="w-4 h-4" /> Email enabled
                                    </span>
                                )}
                            </p>

                            <Link
                                to={`/automation/edit/${automation.id}`}
                                className="btn bg-black mt-8 text-sm cursor-pointer flex justify-center items-center gap-3 text-white hover:bg-gray-800 px-5 py-2 rounded-md"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Automation
                            </Link>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
    );
}
