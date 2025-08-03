

interface SearchBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  handleReset: () => void;
  onGenerateHeatmap: () => void;
}

const SearchBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleReset,
  onGenerateHeatmap,
}: SearchBarProps) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold text-black pb-4">Service Category</h3>
    <div className="flex flex-col items-center gap-4 w-72 mx-auto">
      <select
        id="category-select"
        className="border border-gray-300 px-4 pr-10 py-2 rounded-lg text-gray-700 w-full"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        className="bg-purple text-white py-2 rounded-lg hover:bg-purple-700 w-full"
        onClick={onGenerateHeatmap}
      >
        Generate Heatmap
      </button>

      <button
        className="border border-purple-400 text-black py-2 rounded-lg hover:bg-purple-50 w-full"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  </div>
);

export default SearchBar;