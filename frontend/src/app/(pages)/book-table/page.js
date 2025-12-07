import Banner from "@/app/_components/Banner";
import BookingForm from "@/app/_components/_booking_comps/BookingForm";

export default function BookTable() {
  return (
    <>
      <Banner title="book table"></Banner>
      <main className="p-5 md:p-10 lg:p-20">
        <BookingForm className="bg-red" />
      </main>
    </>
  );
}

