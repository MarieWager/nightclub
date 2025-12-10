export default function BaseButton({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`border border-white py-2 px-6 text-xs tracking-wide uppercase hover:text-[var(--pink)] hover:border-[var(--pink)]transition-colors${className}`}>
        
      {children}
    </button>
  );
}
