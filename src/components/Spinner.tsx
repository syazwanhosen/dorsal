export default function Spinner({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
    </div>
  );
}
