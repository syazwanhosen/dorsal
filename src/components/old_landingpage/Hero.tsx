import { buttonVariants } from "./../ui/buttons/button";
import { HeroCards } from "./HeroCards";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-4 md:py- gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            {" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text animate-gradient">
              AI agents
            </span>{" "}
            for managing
          </h1>{" "}
          your{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text animate-gradient">
              medical bills
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Cut through hidden fees, secure fair rates, and take control of your healthcare costs.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="#waitlist"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "default",
            })}`}
          >
            Get Started
          </a>

          <a
            href="https://www.linkedin.com/company/dorsal-fyi"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Check us out on
            <LinkedInLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
