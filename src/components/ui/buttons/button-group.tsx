// Types
import { ButtonGroupProps } from '../../../types'

export const ButtonGroup = <T extends string>({
    options,
    selected,
    onSelect,
}: ButtonGroupProps<T>) => {
    return (
        <div className="flex w-full rounded-md overflow-hidden">
            {options.map((option: T, index) => {
                const isSelected = selected === option;
                return (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className={`flex-1 py-1 text-sm font-medium border 
              ${isSelected
                                ? 'bg-purple text-white border-2 text-[#8770BC] z-10'
                                : 'bg-gray-100 text-[#8770BC] text-[#8770BC] hover:bg-gray-200'} 
              ${index === 0 ? 'rounded-l-md' : ''} 
              ${index === options.length - 1 ? 'rounded-r-md' : ''}`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}