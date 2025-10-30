export function Button({ onClick, children, className }: any) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg py-2 px-4 transition ${className}`}
    >
      {children}
    </button>
  );
}
