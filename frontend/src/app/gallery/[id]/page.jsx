import Image from "next/image";

export default async function SinglePhotoPage({ params }) {
  // in new nextjs params is a promise, so we have to await it
  const { id } = await params;

  const photoId = Number(id);

  // if id in url is not a number
  if (!photoId) {
    return (
      <div className="py-40 text-center text-white">
        <h1 className="text-2xl">INVALID PHOTO</h1>
      </div>
    );
  }

  const res = await fetch(`http://localhost:4000/gallery/${photoId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="py-40 text-center text-white">
        <h1 className="text-2xl">PHOTO NOT FOUND</h1>
      </div>
    );
  }

  const photo = await res.json();

  // prev / next ids
  const prevId = photoId > 1 ? photoId - 1 : 1;
  const nextId = photoId + 1;

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-5xl px-4">
        {/* image + arrows + close */}
        <div className="relative h-[400px] w-full overflow-hidden bg-black md:h-[550px]">
          <Image
            src={photo.asset.url}
            alt={photo.description}
            fill
            className="object-cover object-center"
          />

          {/* close */}
          <a
            href="/#gallery"
            className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center
                       border-2 border-white bg-black/40 text-xl text-white
                       hover:border-[var(--pink)] hover:text-[var(--pink)] cursor-pointer"
          >
            ✕
          </a>

          {/* left arrow */}
          <a
            href={`/gallery/${prevId}`}
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center
                       border-2 border-white text-white hover:border-[var(--pink)] hover:text-[var(--pink)] md:flex"
          >
            ◀
          </a>

          {/* right arrow */}
          <a
            href={`/gallery/${nextId}`}
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center
                       border-2 border-white text-white hover:border-[var(--pink)] hover:text-[var(--pink)] md:flex"
          >
            ▶
          </a>
        </div>

        {/* text under image */}
        <div className="mt-8 text-white">
          <h2 className="text-xl font-bold uppercase">Night Club Party</h2>

          <p className="mt-4 text-sm leading-relaxed">
            {photo.description}
          </p>

          <div className="mt-6 flex justify-end">
            <button className="form-button w-full md:w-40" type="button">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
