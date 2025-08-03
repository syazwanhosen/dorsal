import { FC } from 'react';
import { TopHospitals } from './TopHospitals';
import { TopServices } from './TopServices';

export const SearchSection: FC = () => {
    return (
        <div className="container search-section flex flex-col md:flex-row gap-4 w-full lg:pb-8 pb-6">
            <TopServices />
            <TopHospitals />
        </div>

    );
};
