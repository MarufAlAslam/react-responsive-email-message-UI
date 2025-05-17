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

interface Automation {
    id: number;
    title: string;
    stats: string;
    enabled: boolean;
    smsEnabled: boolean;
    emailEnabled: boolean;
    icon?: React.ReactNode;
}

interface Props {
    open: boolean;
    onClose: () => void;
    automation: Automation | null;
    setAutomation: React.Dispatch<React.SetStateAction<Automation | null>>;
}

const EditAutomationModal: React.FC<Props> = ({
    open,
    onClose,
    automation,
    setAutomation,
}) => {
    const [step, setStep] = React.useState<"settings" | "review">("settings");
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setStep("settings");
            setMessage(
                automation
                    ? `Hi! This is a reminder for ${automation.title}. Please reach out if you have questions.`
                    : ""
            );
        }
    }, [open, automation]);

    if (!automation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-5xl md:w-3xl md:min-w-3xl md:h-auto h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {step === "settings"
                            ? "Edit Automation Settings"
                            : "Review Message"}
                    </DialogTitle>
                </DialogHeader>

                {step === "settings" && (
                    <div className="space-y-4 py-4">
                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="sms">Send SMS</Label>
                            <Switch
                                id="sms"
                                checked={automation.smsEnabled}
                                onCheckedChange={(checked) =>
                                    setAutomation((prev) =>
                                        prev ? { ...prev, smsEnabled: checked } : null
                                    )
                                }
                            />
                        </div>

                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="email">Send Email</Label>
                            <Switch
                                id="email"
                                checked={automation.emailEnabled}
                                onCheckedChange={(checked) =>
                                    setAutomation((prev) =>
                                        prev ? { ...prev, emailEnabled: checked } : null
                                    )
                                }
                            />
                        </div>

                        <div className="flex justify-start gap-4 items-center">
                            <Label htmlFor="businessHours">Send During Business Hours</Label>
                            <Switch id="businessHours" />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={() => setStep("review")}>
                                Review Message
                            </Button>
                        </div>
                    </div>
                )}

                {step === "review" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        {/* Left: Edit message */}
                        <div className="space-y-2">
                            <Label htmlFor="message">Edit Message</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={10}
                                cols={50}
                            />
                        </div>

                        {/* Right: Live preview */}
                        <div className="space-y-2">
                            {/* <Label>Message Preview</Label> */}
                            {/* <div className="border rounded-md p-4 h-full bg-muted text-muted-foreground whitespace-pre-wrap">
                {message}
              </div> */}
                            <div className="w-[300px] ml-auto h-[500px] border-4 border-black relative rounded-3xl bg-black/5 p-4 pb-2 flex flex-col justify-end">
                                <div className="notch h-[25px] w-[150px] bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl">
                                    <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-1 left-2/3 -translate-x-2/3 rounded-full"></div>
                                    <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-1 left-1/3 -translate-x-1/3 rounded-full"></div>
                                </div>
                                {/* Message bubble */}
                                <div className="max-w-[80%] text-sm ml-auto bg-blue-600 text-white rounded-lg rounded-br-none p-3 shadow-md whitespace-pre-wrap">
                                    {message}
                                </div>
                                <div className="widget-button w-[80px] rounded-4xl mt-4 mx-auto h-[4px] bg-gray-400"></div>
                            </div>

                        </div>

                        {/* Footer buttons (full width) */}
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setStep("settings")}>
                                Back
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log("Final message saved:", message);
                                    onClose();
                                }}
                            >
                                Save Automation
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditAutomationModal;
