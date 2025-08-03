import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What's the big deal?",
    answer:
      "Would you buy groceries without seeing prices? Or a car without knowing the cost? Yet every day, millions of Americans get medical care without knowing what they'll pay. Dorsal.fyi shows you real healthcare prices upfront, helps you compare costs across providers, and ensures you're never overcharged. It's that simple.",
    value: "about",
  },
  {
    question:
      "I'm a patient with a chronic condition - does Dorsal.fyi change things for me?",
    answer:
      "Ongoing medical care shouldn't mean ongoing billing surprises. We track your regular expenses, flag unusual charges, and find better-priced providers for your routine care. One patient cut their annual diabetes costs by 40% just by seeing real price comparisons for the first time.",
    value: "chronic",
  },
  {
    question:
      "What if English isn't my first language or I have difficulty reading?",
    answer:
      "Medical bills are confusing enough for experts, let alone everyday folks. We translate bills into multiple languages, provide audio explanations, and use clear visuals to break down costs. Everyone deserves to understand what they're paying for.",
    value: "accessibility",
  },
  {
    question:
      "How does Dorsal.fyi help if I'm on a limited income or uninsured?",
    answer:
      "Healthcare pricing shouldn't be a mystery, especially when money is tight. We show you upfront costs, find providers with payment plans, and identify lower-cost options for care. Many patients discover they were overpaying by thousands simply because they couldn't compare prices before.",
    value: "affordability",
  },
  {
    question:
      "I'm a healthcare provider - how does Dorsal.fyi transform my practice?",
    answer:
      "Medicine is built on trust, but surprise bills break that trust every day. When patients understand costs upfront, they're more likely to follow recommended treatments and bring their whole family to your practice. Price transparency is increasingly a competitive advantage for equitable care delivery.",
    value: "providers",
  },
  {
    question: "How do insurance companies save money with this?",
    answer:
      "Our solution aims to significantly cut processing times and reduce appeals, enabling partners to handle high volumes of claims faster and save millions in administrative costs.",
    value: "payors",
  },
  {
    question: "How are you ensuring this data is accurate and trustworthy?",
    answer:
      "We track real prices from over 8,000 healthcare facilities, verified against millions of actual bills. Our system catches pricing errors with 99.7% accuracy. If you spot a price that seems wrong, it probably is - and we'll help you fix it.",
    value: "accuracy",
  },
  {
    question: "How do I start saving?",
    answer:
      "Create a free account, upload any medical bill, and see fair prices instantly. Most users find savings in their first 15 minutes. Healthcare pricing is broken - let's fix it together.",
    value: "start",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-16 text-center bg-white">
      <div className="px-0 lg:px-16 xl:px-24">
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#9F70FD1A] mb-4">
          <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
            GENERAL FAQ
          </span>
        </span>

        {/* Title */}
        <div className="text-center lg:mb-12 mb-4">
          <h3 className="lg:text-4xl text-[20px] sm:text-[24px] md:text-[24px] font-bold text-gray-800">
            Frequently Asked Question
          </h3>
        </div>

        <Accordion type="single" collapsible className="w-full AccordionRoot">
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent>
                {" "}
                <p className="text-left">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="font-medium mt-4 text-left">
          Still have questions?{" "}
          <a
            href="https://cal.com/abrar/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8770BC] transition-all border-primary"
          >
            Contact us
          </a>
        </h3>
      </div>
    </section>
  );
};
