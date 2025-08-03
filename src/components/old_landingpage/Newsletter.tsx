import { useState } from "react";
import { Button } from "./../ui/buttons/button";
import { Input } from "./../ui/input";

export const Newsletter = () => {
  const [buttonText, setButtonText] = useState('Submit');
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary" | "destructive" | "outline" | "link" | "ghost" | null | undefined>('outline');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setButtonText('Thanks!');
    setButtonVariant('default');
    setFormSubmitted(true);

    const emailInput = e.currentTarget[0] as HTMLInputElement;
    const email = emailInput.value;

    const formData = new FormData();
    formData.append('entry.2108239172', email);
    console.log(formData);

    try {
      const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLScaCHqfF56Mj8znmN0bWX_NovHkOTmiWhz5E1UdFnD8wxrBcA/formResponse', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Data submitted successfully!');
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="waitlist">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Waitlist
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          We're launching soon. Keep up with our journey.
        </p>

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
          <Button variant={buttonVariant} disabled={formSubmitted}>{buttonText}</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
