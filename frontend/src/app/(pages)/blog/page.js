import Image from "next/image";
import Link from "next/link";
import Banner from "@/app/_components/Banner";

const POSTS_PER_PAGE = 3; 


async function getBlogPosts() {
  const res = await fetch("http://localhost:4000/blogposts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not fetch blogposts");
  }

  const data = await res.json();
  return data;
}

export default async function BlogPage(props) {
  // check searchParams works even if it's a promise
  const searchParams = (await props.searchParams) ?? {};

  // check a clean number for the current page
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;

  const currentPage = rawPage
    ? parseInt(rawPage, 10) || 1
    : 1;

  const posts = await getBlogPosts();

  // newest first
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  //pagination 
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <main className="bg-black text-white min-h-screen">
      {/* top banner */}
      <Banner title="Blog" className="" />

      <section className="max-w-6xl mx-auto px-4 py-16">
        
        {/* list of blog cards */}
        <div className="space-y-16">
          {currentPosts.map((post, index) => {

            // flip layout left/right 
            const isOdd = index % 2 === 1;

            return (
              <article
                key={post.id}
                className="md:grid md:grid-cols-2 gap-8 items-center"
              >
                {/* IMAGE side */}
                <div
                  className={`relative w-full aspect-[16/9] overflow-hidden ${
                    isOdd ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={post.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* TEXT side */}
                <div className={`space-y-4 ${isOdd ? "md:order-1" : ""}`}>
                  <h2 className="text-xl md:text-2xl font-semibold uppercase">
                    {post.title}
                  </h2>

                  {/* preview  */}
                  <p className="text-sm leading-relaxed">
                    {post.content.slice(0, 350)}...
                  </p>

                  {/* button */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="form-button w-full md:w-40 inline-block mt-4 text-center"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* pagination*/}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-4 mt-12 text-sm">
            
            {/* previous page button, only shows if we're not on page 1 */}
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="h-8 w-8 flex items-center justify-center 
                           border-2 border-white text-white 
                           hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5
                           transition-all duration-200"
              >
                ◀
              </Link>
            )}

            {/* page numbers*/}
            <div className="flex gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                const isActive = pageNumber === currentPage;

                const baseClasses =
                  "h-8 w-8 flex items-center justify-center border-2 text-lg transition-all duration-200";

                const activeClasses =
                  "border-[var(--pink)] text-[var(--pink)] bg-white/10 cursor-default pointer-events-none";

                const inactiveClasses =
                  "border-white text-white hover:bg-white/5";

                return (
                  <Link
                    key={pageNumber}
                    href={`/blog?page=${pageNumber}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`${baseClasses} ${
                      isActive ? activeClasses : inactiveClasses
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {/* next page button only shows if there more then 1 page */}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="h-8 w-8 flex items-center justify-center 
                           border-2 border-white text-white 
                           hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5
                           transition-all duration-200"
              >
                ▶
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}
