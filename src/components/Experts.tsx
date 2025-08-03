import { FC } from "react";
import { useEffect } from 'react';

const logos = [
  "aetna.png",
  "Abbott_Laboratories_logo.svg",
  "Blue_Cross_Blue_Shield_Association_logo.svg",
  "clinisys.png",
  "Cigna-Logo.png",
  "Circle_ido49HTltJ_0.svg",
  "Cohere-Logo.png",
  "Curative_Inc_corporate_logo_2021.png",
  "Epic_Systems.svg",
  "Oracle_Health_logo.png",
  "McKesson_Logo.svg",
  "Molina-Healthcare-Logo-horiz-tight.png",
  "ascension-logo.svg",
  "Tencent-Logo.png",
  "Tesla_Motors.svg",
  "ro_Logo.png",
  "Amazon_logo.svg",
  "Walmart_logo.svg",
  "University_of_California,_Berkeley_logo.svg",
  "Lawrence_Berkeley_National_Laboratory_logo.svg",
  "Nyu_short_color.svg",
  "princeton_university.png",
  "stanford-school-of-medicine-seeklogo.png",
  "ut-dallas.png",
  "Wharton-logo.png",
  "UAB-Blazers-Logo.png",
  "Arizona_Wildcats_logo.svg",
];

const logosPerRow = Math.ceil(logos.length / 2);

  const createRows = (arr: string[], perRow: number) => {
    const rows: string[][] = [];
    for (let i = 0; i < arr.length; i += perRow) {
      rows.push(arr.slice(i, i + perRow));
    }
    return rows;
  };

const rows = createRows(logos, logosPerRow);

export const Experts: FC = () => {

  useEffect(() => {
  logos.forEach((src) => {
    const img = new Image();
    img.src = `/expert_logos/${src}`;
  });
  }, []);

  return (
    <div className="container bg-white pt-12 pb-12 md:pt-10 lg:pt-16 lg:pb-24 px-0">
      <div className="items-center justify-center mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#9F70FD1A] text-purple-700">
            <span className="bg-gradient-to-r from-[#E770C1] to-[#9F70FD] bg-clip-text text-transparent">
              TEAM
            </span>
          </span>

          <h2 className="mt-4 text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold text-gray-900 sm:text-4xl">
            Founded by <span className="text-pink">Alumni & Advisors</span> from
          </h2>

        </div>

        <div className="w-full overflow-hidden bg-white py-6">
            {rows.map((row, index) => (
                <div
                key={index}
                className={`flex w-max gap-x-12 whitespace-nowrap px-2 ${
                    index % 2 === 0 ? "animate-scrollLeft" : "animate-scrollRight"
                }`}
                >
                {/* Double logos to ensure smooth infinite scroll */}
               {row.concat(row).map((logo, i) => (
                    <div
                      key={`${logo}-${i}`}
                      className="bg-white my-6 h-8 sm:h-11 flex items-center justify-center inline-block"
                    >
                      <img
                        src={`/expert_logos/${logo}`}
                        alt={`logo-${i}`}
                        className="h-6 sm:h-8 w-auto filter grayscale brightness-80 contrast-50 transition duration-300 hover:brightness-90"
                      />
                    </div>
                ))}
                </div>
            ))}
        </div>

     </div>
    </div>
  );
};