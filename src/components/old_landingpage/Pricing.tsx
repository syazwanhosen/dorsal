import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  planType: PlanType;
  price: number | string;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
}

const pricingList: PricingProps[] = [
  {
    title: "Free",
    planType: 0,
    price: 0,
    description:
      "Embrace the movement.",
    buttonText: "Get Started",
    benefitList: [
      "Access anonymized billing data",
      "Contribute to our community",
      "Conduct an audit with our AI agents for free",
      "Only pay 15% of what you save per claim"
    ],
    href: "#waitlist"
  },
  {
    title: "Premium",
    planType: 0,
    price: 99,
    description:
      "Manage payments for the whole family.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Preemptively audit for billing errors",
      "Uncover 501(r) discounts",
      "Track and invest your savings",
      "Always break even: 10% savings or get a refund"
    ],
    href: "#waitlist"
  },
  {
    title: "Enterprise",
    planType: 1,
    price: 499,
    description:
      "Built for healthcare analysts.",
    buttonText: "Contact Us",
    benefitList: [
      "Custom datasets on request",
      "Commercial or press licensing",
      "Built-in visualization tooling",
      "API-level access for B2B use cases"
    ],
    href: "#waitlist"
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Dorsal Works For
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Everyone{" "}
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        We bet we can save you money on your medical bills. Explore our plans.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.planType === PlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.planType === PlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Analytics Suite
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <a
                href="#waitlist"
                className={`w-full ${buttonVariants({
                  variant: "default",
                })}`}
              >
                {pricing.buttonText}
              </a>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
