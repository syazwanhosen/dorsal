import nvidia from "../assets/nvidia.avif";
import deepgram from "../assets/deepgram.svg";
import mitsui from "../assets/mitsui.svg";
import microsoft from "../assets/ms_forstartups.png";
import amazon from "../assets/amazon.avif";
import google from "../assets/google.png";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <img
      src={nvidia}
      alt={"NVidia"}
      width={100}
    />,
    name: "NVidia",
  },
  {
    icon: <img
      src={deepgram}
      alt={"Deepgram"}
      width={125}
      
    />,
    name: "Deepgram",
  },
  {
    icon: <img
      src={mitsui}
      alt={"Mitsui"}
      width={75}
      
    />,
    name: "Deepgram",
  },
  {
    icon: <img
      src={amazon}
      alt={"Amazon"}
      width={150}
    />,
    name: "Amazon",
  },
  {
    icon: <img
      src={google}
      alt={"Google"}
      width={150}
    />,
    name: "Google",
  },
  {
    icon: <img
      src={microsoft}
      alt={"Microsoft"}
      width={150}
      
    />,
    name: "Microsoft",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-42 sm:py-0 p-2 rounded"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        BACKED BY
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>{icon}</span>
            {/* <h3 className="text-xl  font-bold">{name}</h3> */}
          </div>
        ))}
      </div>
    </section>
  );
};
