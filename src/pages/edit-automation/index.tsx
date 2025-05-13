import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ClipboardList, CalendarClock, Mail, MessageCircle, RotateCcw } from "lucide-react";

const automationTypes = [
    { label: "Post Job Follow-Up", icon: <ClipboardList /> },
    { label: "1st Estimate Follow-Up", icon: <ClipboardList /> },
    { label: "2nd Estimate Follow-Up", icon: <ClipboardList /> },
    { label: "Inspection Reminder", icon: <CalendarClock /> },
    { label: "Review Request", icon: <RotateCcw /> },
];

const anchorOptions = [
    "After Last Visit",
    "After Last Invoice",
    "After Last Estimate",
    "Before Next Appointment",
    "After Last Appointment",
    "creation_date", // ✅ valid value instead of ""
];


export default function EditAutomationPage() {
    const [selectedType, setSelectedType] = useState<string>("");
    const [timing, setTiming] = useState<string>("");
    const [unit, setUnit] = useState<string>("Days");
    const [anchor, setAnchor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [draftMessage, setDraftMessage] = useState<string>("");
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);

    const exampleMessage =
        "Hi {{ customer.first_name }}, it's time for your vehicle's tire rotation! Schedule your appointment with {{ shop.name }} here: {{ shop.website_url }}.";

    const handleGenerate = () => {
        // Mock AI draft logic
        setDraftMessage(exampleMessage);
    };

    const handleReset = () => {
        setDraftMessage(exampleMessage);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Edit Automation</h1>

            {/* A. Select Automation Type */}
            <div>
                <h2 className="font-semibold mb-2">Select Automation Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {automationTypes.map((type) => (
                        <Card
                            key={type.label}
                            onClick={() => setSelectedType(type.label)}
                            className={`cursor-pointer border-2 ${selectedType === type.label ? "border-blue-600" : "border-transparent"
                                }`}
                        >
                            <CardContent className="flex items-center gap-4 p-4">
                                {type.icon}
                                <span>{type.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* B. Schedule Message Timing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                    type="number"
                    placeholder="Enter timing"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                />
                <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {['Hours', 'Days', 'Weeks', 'Months'].map((u) => (
                            <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={anchor} onValueChange={setAnchor}>
                    <SelectTrigger>
                        <SelectValue placeholder="Anchor point" />
                    </SelectTrigger>
                    <SelectContent>
                        {anchorOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt === "creation_date" ? "Use Creation Date" : opt}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>

            {/* C. Message Content Drafting */}
            <div>
                <h2 className="font-semibold mb-2">Describe Your Message</h2>
                <Textarea
                    placeholder="e.g., Remind customers about tire rotations every 6 months."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button className="mt-2" onClick={handleGenerate}>
                    Generate Draft
                </Button>
                <Textarea
                    className="mt-4"
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                />
                <Button variant="ghost" className="mt-2 text-blue-600" onClick={handleReset}>
                    Back to Default Message
                </Button>
            </div>

            {/* D. Delivery Method Toggles */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                    <span className="flex items-center gap-1 text-sm">
                        <MessageCircle className="w-4 h-4" /> Send via SMS
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                    <span className="flex items-center gap-1 text-sm">
                        <Mail className="w-4 h-4" /> Send via Email
                    </span>
                </div>
            </div>

            {/* E. Message Preview */}
            <div>
                <h2 className="font-semibold mb-2">Message Preview</h2>
                <div className="bg-muted p-4 rounded text-sm">
                    {draftMessage
                        .replace("{{ customer.first_name }}", "John")
                        .replace("{{ shop.name }}", "AutoPro")
                        .replace("{{ shop.website_url }}", "www.autopro.com")}
                </div>
            </div>

            {/* F. Submit */}
            <div className="text-right">
                <Button className="mt-4">Save Automation</Button>
            </div>
        </div>
    );
}
