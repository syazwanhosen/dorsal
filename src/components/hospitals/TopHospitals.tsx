import { FC } from 'react';
import { Hospital } from 'lucide-react';

interface TopSearchHospital {
  name: string;
  state: string;
}

const topHospitals: TopSearchHospital[] = [
  { name: "Children's Hospital Of Alabama", state: "Alabama" },
  { name: "St Joseph's Hospital And Medical Center", state: "Arizona" },
  { name: "Chi St. Vincent Hospital Hot Springs", state: "Arkansas" },
  { name: "Loma Linda University Medical Center", state: "California" },
  { name: "Vibra Rehabilitation Hospital Of Denver", state: "Colorado" },
  { name: "Select Specialty Hospital Wilmington", state: "Delaware" },
  { name: "Memorial Hospital And Manor", state: "Georgia" },
  { name: "The Queen's Medical Center", state: "Hawaii" },
  { name: "Mountain View Hospital", state: "Idaho" },
  { name: "The Carle Foundation Hospital", state: "Illinois" }
];


const generateHospitalUrl = (name: string, state: string) => {
  const params = new URLSearchParams({ name, state });
  return `/hospital_details?${params.toString()}`;
};

export const TopHospitals: FC = () => {
  return (
    <div className="bg-[#F5F1FF] rounded-md py-4 px-4 lg:px-8 w-full">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
          <Hospital className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Popular Hospitals</h2>
      </div>
      <ul>
        {topHospitals.map((hospital) => {
          const url = generateHospitalUrl(hospital.name, hospital.state);
          return (
            <li key={hospital.name} className="mb-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#8770BC] font-semibold">{hospital.name}</span>
                  <span className="italic text-gray-600">{hospital.state}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
