export function FeatureChip({ values, onDelete }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
      <span>{values.join(" | ")}</span>
      <button onClick={onDelete}>×</button>
    </div>
  );
}
