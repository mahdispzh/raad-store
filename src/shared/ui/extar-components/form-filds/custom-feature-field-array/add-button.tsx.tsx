export function AddButton({ onClick, disabled }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-2 bg-black text-white rounded disabled:opacity-40"
    >
      +
    </button>
  );
}
