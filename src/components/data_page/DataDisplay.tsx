interface PriceItem {
  state: string;
  value: number | null;
  color: string;
}

const DataDisplay = ({ label, items }: { label: string; items: PriceItem[] }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold text-black">{label}</h3>
    {items.map((item, idx) => (
      <div
        key={idx}
        className="flex items-center justify-between mt-1"
        style={{
          minHeight: "35px", 
        }}
      >
        {/* State Name */}
        <div className="min-w-0 pr-2 flex-1">
          <p
            className="text-purple text-base font-medium truncate"
            style={{ lineHeight: "1.3" }} 
          >
            {item.state || "N/A"}
          </p>
        </div>

        {/* Color Box and Value */}
        <div
          className="flex items-center justify-end gap-2 shrink-0"
          style={{ minWidth: "100px", alignItems: "center" }}
        >
          {item.value !== null && item.value !== undefined ? (
            <>
              <span
                className="w-5 h-5 rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span
                className="text-gray-700 text-sm font-medium text-right"
                style={{
                  width: "60px", 
                  textAlign: "right",
                }}
              >
                ${item.value.toFixed(2)}
              </span>
            </>
          ) : (
            <div
              className="text-gray-500 text-sm font-medium text-right whitespace-nowrap"
              style={{
                width: "150px", 
                textAlign: "right",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", 
              }}
            >
              No Price Available
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default DataDisplay;
