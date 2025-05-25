import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { FaUser } from "react-icons/fa";

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
  const [showPreview, setShowPreview] = useState(false);
  // const [googleReviewLink, setGoogleReviewLink] = useState("");
  // const [feedbackFormLink, setFeedbackFormLink] = useState("");
  // const [frequency, setFrequency] = useState("4");
  // const [unit, setUnit] = useState("Months");
  // const [trigger, setTrigger] = useState("Blank");
  const [userInput, setUserInput] = useState("");
  const [aiMessage, setAiMessage] = useState(
    "Hi {{customer.first_name}}, it's a great time to get your tires rotated! Stay safe on the road -- book now at {{shop.website_url}}"
  );

  const regenerateMessage = () => {
    // Dummy AI response based on user input
    setAiMessage(
      `Hi {{customer.first_name}}, it's a great time to get your tires rotated! Stay safe on the road -- book now at {{shop.website_url}}`
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Review Request Automation</h1>

      {!showPreview ? (
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

            {/* <div className="space-y-2">
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
          </div> */}

            {/* <div className="flex items-center space-x-4">
            <div className="w-24">
              <Label className="mb-2">Frequency</Label>
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
          </div> */}

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

                <Button variant="outline">Review</Button>
              </div>
            </div>

            {/* AI generated button */}
            <div className="text-left">
              <Button onClick={regenerateMessage}>Generate AI Message</Button>
            </div>
            <div>
              <Label>AI Generated Message</Label>
              <p className="text-sm mb-1">
                Tell us what you'd like to message your customers, then click the button above. Our AI will generate a personalized message for you. Example: : "Refund customers about tire rotation every 6 months"
              </p>
              <Textarea value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} rows={4} />
              <p className="text-xs text-muted-foreground mt-1">
                Example variables: <code>{`{{customer.first_name}}, {{shop.name}}, {{shop.website_url}}`}</code>
              </p>
            </div>

            {/* <div className="space-y-2">
            <Label>Google Review Link</Label>
            <Input
              placeholder="https://g.page/your-business"
              value={googleReviewLink}
              onChange={(e) => setGoogleReviewLink(e.target.value)}
            />
          </div> */}

            {/* <div className="space-y-2">
            <Label>Internal Feedback Form Link</Label>
            <Input
              placeholder="https://yourdomain.com/feedback-form"
              value={feedbackFormLink}
              onChange={(e) => setFeedbackFormLink(e.target.value)}
            />
          </div> */}

            {/* sms version */}
            <div className="space-y-2">
              <Label>SMS Version</Label>
              <Textarea
                placeholder="e.g. Hi {{customer.first_name}}, it's a great time to get your tires rotated! Stay safe on the road -- book now at {{shop.website_url}}"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                rows={4}
              />
            </div>

            {/* email version */}
            <div className="space-y-2">
              <Label>Email Version</Label>
              <Textarea
                placeholder="e.g. Hi {{customer.first_name}}, it's a great time to get your tires rotated! Stay safe on the road -- book now at {{shop.website_url}}"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                rows={4}
              />
            </div>

            {/* note */}
            <div className="space-y-2">
              <p className="text-sm">
                <b>Note:</b> this is an AI generated message, please edit it to your liking.
              </p>
            </div>

            <div className="text-right pt-4 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => setShowPreview(true)}>Preview</Button>
              <Button>Create Automation</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Preview Message</h2>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {/* SMS Preview */}
              <div className="flex flex-col items-center">
                <h3 className="font-medium mb-2">SMS Preview</h3>
                <div className="w-[270px] h-[500px] border-4 border-b-8 border-black relative rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-4 pb-2 flex flex-col justify-end overflow-hidden">
                  {/* Notch */}
                  <div className="notch h-[15px] w-[100px] bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl shadow-inner">
                    <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-[2px] left-2/3 -translate-x-2/3 rounded-full shadow-sm"></div>
                    <div className="camera-hole h-[7px] w-[7px] bg-white absolute z-10 top-[2px] left-1/3 -translate-x-1/3 rounded-full shadow-sm"></div>
                  </div>

                  {/* Chat Bubble */}
                  <div className="max-w-[90%] text-sm ml-auto bg-blue-600 text-white rounded-lg rounded-br-none p-3 shadow-md whitespace-pre-wrap">
                    {aiMessage}
                  </div>

                  {/* Home Button */}
                  <div className="widget-button w-[60px] rounded-4xl mt-4 mx-auto h-[4px] bg-gray-400"></div>
                </div>
              </div>

              {/* Email Preview */}
              <div className="flex flex-col items-center">
                <h3 className="font-medium mb-2">Email Preview</h3>
                <div className="w-[270px] pt-6 h-[500px] border-[6px] border-b-[12px] border-black relative rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
                  <div className="notch h-[15px] w-[100px] bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl shadow-inner z-10"></div>
                  <div className="p-3 text-xs overflow-y-auto">
                    <h2 className="text-base font-semibold mb-1">Welcome to Auto Shop</h2>
                    <p className="text-gray-500 text-xs mb-2">
                      <FaUser className="inline bg-gray-100 w-[30px] h-[30px] p-2 rounded-full mr-2" />
                      no-reply · to me · Dec 8, 2024</p>
                    <div className="bg-gray-100 p-2 rounded mb-2">
                      <p className="mb-2">{aiMessage}</p>
                      <p className="text-blue-600 underline mb-1 cursor-pointer">Explore 600+ free digital courses</p>
                      <p className="text-blue-600 underline mb-1 cursor-pointer">Discover Learning Plans developed by AWS Experts</p>
                      <p className="text-blue-600 underline cursor-pointer">Contact us</p>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 leading-snug">
                      Amazon Web Services, Inc. is a subsidiary of Amazon.com, Inc. This message was produced and distributed by Amazon Web Services Inc.
                    </p>
                  </div>
                  <div className="widget-button w-[60px] rounded-4xl mt-auto mb-2 mx-auto h-[4px] bg-gray-400"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      )}
    </div>
  );
}
