export default function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-4 ${className}`}>
      {children}
    </div>
  );
}
