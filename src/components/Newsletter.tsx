import { useState } from "react";
import { Button } from "./ui/buttons/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  const [buttonText, setButtonText] = useState("Submit");
  const [buttonVariant, setButtonVariant] = useState<
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "link"
    | "ghost"
    | null
    | undefined
  >("outline");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButtonText("Thanks!");
    setButtonVariant("default");
    setFormSubmitted(true);

    const emailInput = e.currentTarget[0] as HTMLInputElement;
    const email = emailInput.value;
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScaCHqfF56Mj8znmN0bWX_NovHkOTmiWhz5E1UdFnD8wxrBcA/formResponse";
    const BASE_URL = `https://corsproxy.io/?url=${FORM_URL}`;

    const formData = new FormData();
    formData.append("entry.2108239172", email);
    console.log(formData);

    try {
      const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

      if (response.ok) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Failed to submit data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="waitlist" className="bg-white">
      <hr className="w-11/12 mx-auto mt-0 mb-2 md:mb-0 lg:mb-0" />

      <div className="container pt-4 pb-6 md:pb-20 md:pt-12 text-center">
        {/* Badge */}
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#9F70FD1A] mb-4">
          <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
            WAITLIST
          </span>
        </span>

        {/* Title */}
        <h3 className="text-center md:text-4xl  font-bold">
          Join The <span className="text-pink">Movement</span>
        </h3>
        <p className="md:text-xl text-gray-600 font-normal text-muted-foreground text-center lg:mt-4 lg:mb-8 mt-2 mb-4">
          We're launching soon. Keep up with our journey.
        </p>

        {/* Form */}
        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="alex@dorsal.fyi"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            disabled={formSubmitted}
          />
          <Button variant={buttonVariant} disabled={formSubmitted}>
            {buttonText}
          </Button>
        </form>
      </div>

    </section>
  );
};
