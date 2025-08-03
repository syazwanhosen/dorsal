import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/Shot.png";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Search for Fair Prices",
    description:
      "Our platform leverages data from hospitals and other patients to give you a transparent view of fair costs, helping you understand and compare the charges on your itemized bill.",
    icon: <ChartIcon />,
  },
  {
    title: "Support with Expert Insights",
    description:
      "We analyze your bill and compare it against crowdsourced data, flagging suspicious or inflated charges and providing guidance on the next steps for potential reductions.",
    icon: <WalletIcon />,
  },
  {
    title: "Save with Automated Negotiations",
    description:
      "Our automated agents negotiate directly with billing departments on your behalf, keeping you updated every step of the way to ensure you secure the best possible outcome.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section 
      id="services"
      className="container py-24 sm:py-32"
    >
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            It's {" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Painless{" "}
            </span>
            to Get Started
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Search, support, and save with Dorsal Health.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className="w-full md:w-[167px] lg:w-[200px] object-contain"
          alt="mockup _ "
        />
      </div>
    </section>
  );
};
