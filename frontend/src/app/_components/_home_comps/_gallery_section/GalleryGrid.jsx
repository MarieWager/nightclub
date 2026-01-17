import GalleryItem from "@/app/_components/_home_comps/_gallery_section/GalleryItem";

// just getting all gallery photos
async function getGallery() {
  const res = await fetch("http://localhost:4000/gallery", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not load gallery");
  }

  return res.json();
}

export default async function GalleryGrid() {
  const photos = await getGallery();

  const firstRow = photos.slice(0, 4);
  const secondRow = photos.slice(4, 7);

  return (
    <section id="gallery" className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-2">
        
        {/* row 1 */}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          {firstRow.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              i={i} // used for animation order
            />
          ))}
        </div>

        {/* row 2 */}
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
          {secondRow.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              i={i + firstRow.length}  // continue animation order from the first row
            />
          ))}
        </div>

      </div>
    </section>
  );
}
