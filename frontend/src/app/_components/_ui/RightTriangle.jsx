export default function RightTriangle() {
  return (
    <div
      className="absolute right-0 bottom-0 w-8 h-8"
      style={{
        background: "var(--pink)",
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        zIndex: 10,
      }}
    />
  );
}
