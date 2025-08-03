export const getColor = (
    price: number,
    minPrice: number,
    maxPrice: number,
    hover: boolean = false
  ): string => {
    if (isNaN(price) || maxPrice === minPrice) return "hsl(234, 84%, 95%)";
  
    const percentage = (price - minPrice) / (maxPrice - minPrice);
    let lightness = 95 - percentage * 50; // 95% (low) → 45% (high)
  
    if (hover) {
      lightness -= 10; // make it darker on hover
      if (lightness < 10) lightness = 10; // cap at 10%
    }
  
    return `hsl(234, 84%, ${lightness}%)`;
  };