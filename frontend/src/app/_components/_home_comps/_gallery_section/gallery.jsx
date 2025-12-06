import Image from "next/image";

// Server-side fetch for API
async function getGallery() {
  const res = await fetch("http://localhost:4000/gallery", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch gallery");

  return res.json();
}

export default async function Gallery() {
  const photos = await getGallery();

  const firstRow = photos.slice(0, 4); // 4 images
  const secondRow = photos.slice(4, 7); // 3 images

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 space-y-2">
        {/* Row 1 – 4 images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {firstRow.map((photo) => (
            <div
              key={photo.id}
              className="relative w-full overflow-hidden aspect-[16/9]"
            >
              <Image
                src={photo.asset.url}
                alt={photo.description ?? "Gallery photo"}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Row 2 – 3 images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {secondRow.map((photo) => (
            <div
              key={photo.id}
              className="relative w-full overflow-hidden aspect-[16/9]"
            >
              <Image
                src={photo.asset.url}
                alt={photo.description ?? "Gallery photo"}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
