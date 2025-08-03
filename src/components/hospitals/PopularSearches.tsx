import { useState, FC } from 'react';
import type { PopularSearchTabType } from '@/types';
import { ButtonGroup } from '../ui/buttons/button-group';

const tabs: PopularSearchTabType[] = ['Procedures', 'Condition', 'Specialty'];
const searchTerms = [
    'MRI with contrast',
    'Colonoscopy',
    'Cesarean',
    'Heart Bypass Surgery',
    'Knee Replacement',
];

export const PopularSearches: FC = () => {
    const [activeTab, setActiveTab] = useState<PopularSearchTabType>('Procedures');

    return (
        <div className="border rounded-md p-4 w-full">
        <h2 className="font-bold text-lg mb-2">Popular Searches</h2>
      
        {/* Ensure buttons wrap on smaller screens */}
        <div className="flex flex-wrap gap-2 justify-center sm:flex-row flex-col">
          <ButtonGroup options={tabs} selected={activeTab} onSelect={setActiveTab} />
        </div>
      
        <ul className="text-[#8770BC] space-y-1 mt-4">
          {searchTerms.map((term) => (
            <li key={term} className="hover:underline cursor-pointer">
              {term}
            </li>
          ))}
        </ul>
      </div>
      
      
    );
};
