// Here used CSS instead of Tailwind here because I couldn’t get it to work like the left triangle 
//clipPath cuts the element into a triangle using three points


export default function RightTriangle() {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        width: "32px",
        height: "32px",
        background: "var(--pink)",
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      }}
    />
  );
}

