import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const triggerOptions = [
  "Blank",
  "After Last Visit",
  "After Last Invoice",
  "After Last Estimate",
  "Before Next Appointment",
  "After Last Appointment",
];

const timeUnits = ["Months", "Weeks", "Days", "Hours"];

export default function ReviewRequestAutomationPage() {
  const [automationName, setAutomationName] = useState("");
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [feedbackFormLink, setFeedbackFormLink] = useState("");
  const [frequency, setFrequency] = useState("4");
  const [unit, setUnit] = useState("Months");
  const [trigger, setTrigger] = useState("Blank");
  const [userInput, setUserInput] = useState("");
  const [aiMessage, setAiMessage] = useState(
    "Hi {{customer.first_name}}, we hope you had a great experience with {{shop.name}}. Every review means the world to us: {{shop.website_url}}"
  );

  const regenerateMessage = () => {
    // Dummy AI response based on user input
    setAiMessage(
      `Hi {{customer.first_name}}, it's time for your vehicle's ${userInput.toLowerCase()}! Keeping up with this service helps your {{customer.vehicle_model}} perform its best. Schedule your appointment with {{shop.name}} here: {{shop.website_url}}`
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Review Request Automation</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Automation Name</Label>
            <Input
              placeholder="Name this automation"
              value={automationName}
              onChange={(e) => setAutomationName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Trigger</Label>
            <Select value={trigger} onValueChange={setTrigger}>
              <SelectTrigger>
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                {triggerOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-24">
              <Label>Frequency</Label>
              <Input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <div>
              <Label>&nbsp;</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeUnits.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            If you choose the <strong>Blank</strong> option and set the frequency to 4 months, the
            message will be sent every 4 months from the creation date of the automation.
          </p>

          <div className="space-y-2">
            <Label>What do you want to message your customers about?</Label>
            <Input
              placeholder="e.g. Tire rotation reminder"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="destructive" onClick={regenerateMessage}>
                Regenerate Message
              </Button>
              <Button variant="outline">Review</Button>
            </div>
          </div>

          <div>
            <Label>AI Drafted Message</Label>
            <Textarea value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} rows={4} />
            <p className="text-xs text-muted-foreground mt-1">
              Example variables: <code>{`{{customer.first_name}}, {{shop.name}}, {{shop.website_url}}`}</code>
            </p>
          </div>

          <div className="space-y-2">
            <Label>Google Review Link</Label>
            <Input
              placeholder="https://g.page/your-business"
              value={googleReviewLink}
              onChange={(e) => setGoogleReviewLink(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Internal Feedback Form Link</Label>
            <Input
              placeholder="https://yourdomain.com/feedback-form"
              value={feedbackFormLink}
              onChange={(e) => setFeedbackFormLink(e.target.value)}
            />
          </div>

          <div className="text-right pt-4">
            <Button>Create Automation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
