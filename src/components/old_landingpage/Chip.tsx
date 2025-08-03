import { FC } from 'react';

// Types
import { ChipProps } from '@/types';

const colorMap = {
  green: 'bg-green-legend text-white',
  red: 'bg-red-legend text-white',
};

export const Chip: FC<ChipProps> = ({ label, color = 'green' }) => {
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${colorMap[color]}`}>
      {label}
    </span>
  );
};
