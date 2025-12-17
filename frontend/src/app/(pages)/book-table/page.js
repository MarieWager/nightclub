import Banner from "@/app/_components/Banner";
import BookTableSection from "@/app/_components/_booking_comps/BookTableSection";



export default function BookTable() {
  return (
    <>
      <Banner title="book table"></Banner>
      <main className="p-5 md:p-10 lg:p-20">
        <BookTableSection />
      </main>
    </>
  );
}

