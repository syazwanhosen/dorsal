import { Badge } from "./../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/academic_culture.jpeg";
import image3 from "../assets/democratizing_nyc.jpeg";
import image4 from "../assets/looking-ahead.jpeg";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Future Focused",
    description:
      "We're keeping up with the latest advancements in LLMs to build agents that get the job done.",
    image: image4,
  },
  {
    title: "Democratizing Healthcare",
    description:
      "Payers and providers know what their services cost. Why don't we? We think it's time to change that.",
    image: image3,
  },
  {
    title: "Academic Culture",
    description:
      "The founding team brings years of peer-reviewed NLP research expertise.",
    image: image,
  },
];

const featureList: string[] = [
  "Crowdsourced Data",
  "Price Transparency",
  "Fine-Tuned LLMs",
  "VOIP Agents",
  "Payment Management",
  "HSA Savings Plan"
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center md:text-center">
        What Makes{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Dorsal{" "}
        </span>
        Special
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
