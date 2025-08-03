import { FC } from 'react';
import type { TopSearchServices } from '@/types';
import { Tag } from "lucide-react";

const hospitals: TopSearchServices[] = [
    {
        name: 'Bilateral Venous Duplex Scan',
        hospital_count: '245',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Ultrasound&subcategory=Duplex%20Scan%20-%20Extremity%20Veins&service=Bilateral%20Venous%20Duplex%20Scan'
    },
    {
        name: '12 Lead Electrocardiogram Tracing Only',
        hospital_count: '244',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Cardiography&subcategory=Electrocardiogram&service=12%20Lead%20Electrocardiogram%20Tracing%20Only'
    },
    {
        name: 'Complete Transthoracic Echocardiogram with Doppler',
        hospital_count: '240',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Ultrasound&subcategory=Echocardiography%20(TTE%2FTEE)&service=Complete%20Transthoracic%20Echocardiogram%20with%20Doppler'
    },
     {
        name: 'Limited Bilateral Arterial Physiologic Study',
        hospital_count: '225',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Ultrasound&subcategory=Duplex%20Scan%20-%20Extremity%20Arteries&service=Limited%20Bilateral%20Arterial%20Physiologic%20Study'
    },
     {
        name: 'Cardiovascular Stress Test Tracing Only',
        hospital_count: '221',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Cardiography&subcategory=Electrocardiogram&service=Cardiovascular%20Stress%20Test%20Tracing%20Only'
    },
     {
        name: 'Complete Clavicle X-Ray Examination',
        hospital_count: '221',
        url: 'hospitals?state=AR%20-%20Arkansas&category=Standard%20X-ray&subcategory=X-ray%20-%20Upper%20Extremity&service=Complete%20Clavicle%20X-Ray%20Examination'
    },
     {
        name: 'Neck Soft Tissue X-Ray Examination',
        hospital_count: '220',
        url: 'http://localhost:4000/hospitals?state=AL%20-%20Alabama&category=Standard%20X-ray&subcategory=Others%20(Standard%20X-ray)&service=Neck%20Soft%20Tissue%20X-Ray%20Examination'
    },
     {
        name: 'Complete X-Ray of Facial Bones (Minimum 3 Views)',
        hospital_count: '218',
        url: 'http://localhost:4000/hospitals?state=AL%20-%20Alabama&category=Standard%20X-ray&subcategory=Others%20(Standard%20X-ray)&service=Complete%20X-Ray%20of%20Facial%20Bones%20(Minimum%203%20Views)'
    },
     {
        name: 'X-ray of Skull, Less Than 4 Views',
        hospital_count: '218',
        url: 'http://localhost:4000/hospitals?state=AL%20-%20Alabama&category=Standard%20X-ray&subcategory=Others%20(Standard%20X-ray)&service=X-ray%20of%20Skull%2C%20Less%20Than%204%20Views'
    },
     {
        name: 'Wrist X-Ray, 2 Views',
        hospital_count: '218',
        url: 'hospitals?state=CA%20-%20California&category=Standard%20X-ray&subcategory=X-ray%20-%20Upper%20Extremity&service=Wrist%20X-Ray%2C%202%20Views'
    },
     /* {
        name: 'Limited Transthoracic Echocardiogram',
        hospital_count: '217',
        url: 'hospitals?state=CA%20-%20California&category=Ultrasound&subcategory=Echocardiography%20(TTE%2FTEE)&service=Limited%20Transthoracic%20Echocardiogram'
    }, */
     
];

export const TopServices: FC = () => {
    return (
        <div className="bg-[#F5F1FF] rounded-md py-4 px-4 lg:px-8 w-full">
        <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
                      <Tag className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Popular Services
                    </h2>
        </div>
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.name} className="mb-2">
              <a href={hospital.url} target="_blank" className="flex flex-wrap items-center gap-2 hover:underline">
                <span className="text-[#8770BC] font-semibold">{hospital.name}</span>
                <span className="italic text-gray-600">{hospital.hospital_count} Hospitals</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
    );
};
