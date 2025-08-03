import { buttonVariants } from "@/components/ui/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Linkedin, BookA } from "lucide-react";
import abrar from "../assets/abrar-rahman.jpg";
import rabby from "../assets/rabby.png";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
  bio: string;
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: abrar,
    name: "Abrar Rahman",
    position: "CEO",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/abrarfrahman/" },
      { name: "Portfolio", url: "https://abrarrahman.com/" },
    ],
    bio: "Prev. at Epic Systems, Amazon, Tesla, Berkeley Lab (LBNL)"
  },
  {
    imageUrl: rabby,
    name: "Shahariar Rabby",
    position: "Technical Lead",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/shahariarrabby/" },
    ],
    bio: "PhD ML engineer with five years of industry expertise"
  }
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Portfolio":
        return <BookA size="20" />;
    }
  };

  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold justify-center">
        Our {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Team
        </span>
      </h2>

      <p className="text-center mt-4 mb-10 text-xl text-muted-foreground">
        Deep technical DNA informs our rigorous approach to patient empowerment.
      </p>

      <div className="grid md:grid-cols-4 lg:grid-cols-2 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks, bio }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{bio}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
