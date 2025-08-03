import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare, Send } from "lucide-react";
import { Label } from "../ui/label";

export function SteeringQuestions() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string | null>>({});
  const [textResponse, setTextResponse] = useState("");

  const questions = [
    {
      id: 1,
      question:
        "Which area of medical billing transparency is most important to you?",
      type: "radio",
      options: [
        "Understanding CPT codes and charges",
        "Comparing prices across providers",
        "Identifying billing errors and overcharges",
        "Streamlining the appeals process",
        "Simplifying payment options",
      ],
    },
    {
      id: 2,
      question: "What challenges do you face when dealing with medical bills?",
      type: "text",
      placeholder: "Share your experience with medical billing...",
    },
    {
      id: 3,
      question:
        "Which feature would make the biggest impact on your healthcare experience?",
      type: "radio",
      options: [
        "Automated bill analysis",
        "One-click appeals for suspicious charges",
        "Price comparison tools",
        "Integration with insurance providers",
        "Mobile app for bill tracking",
      ],
    },
  ];

  const handleRadioChange = (value: string) => {
    setResponses({
      ...responses,
      [activeQuestion]: value,
    });
  };

  const handleSubmitText = () => {
    if (textResponse.trim()) {
      setResponses({
        ...responses,
        [activeQuestion]: textResponse,
      });
      setTextResponse("");
    }
  };

  const handleNext = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const currentQuestion = questions[activeQuestion];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Help Shape Our Roadmap
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {currentQuestion.question}
          </h3>

          {currentQuestion.type === "radio" && (
            <RadioGroup
              options={currentQuestion.options || []}
              selectedValue={(responses[activeQuestion] as string) || ""}
              onChange={handleRadioChange}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    selectedValue={(responses[activeQuestion] as string) || ""} 
                    onChange={handleRadioChange} 
                  />
                  <Label htmlFor={`option-${index}`} className="text-gray-700">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "text" && (
            <div className="space-y-3">
              <Textarea
                placeholder={currentQuestion.placeholder}
                className="min-h-[120px]"
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
              />
              <Button onClick={handleSubmitText} className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Submit feedback
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeQuestion
                    ? "bg-purple-600"
                    : index < activeQuestion || responses[index] !== undefined
                    ? "bg-purple-300"
                    : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                activeQuestion === questions.length - 1 ||
                responses[activeQuestion] === undefined
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
