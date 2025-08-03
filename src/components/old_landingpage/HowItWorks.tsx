import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Cash Back",
    description:
      "Our LLM agents use VOIP & email clients to negotiate savings of up to 90%.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "It's free to create an account and start comparing and sharing your anonymized medical bills.",
  },
  {
    icon: <PlaneIcon />,
    title: "Negotiations",
    description:
      "Our LLM agents handle the heavy lifting. Try us for free and only pay 10% of what you save.",
  },
  {
    icon: <GiftIcon />,
    title: "Alerting",
    description:
      "Subscribe for real-time bill auditing and lower rates for the whole family.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How We{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Transform{" "}
        </span>
        Healthcare Finance
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Reeling from sticker shock? Our system flags billing errors and unlocks hidden discounts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
