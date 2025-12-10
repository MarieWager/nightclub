import "./globals.css";
import Nav from "./_components/Nav.jsx";
import Footer from "./_components/Footer";
import NewsletterForm from "./_components/NewsletterForm"

export const metadata = {
  title: "Night Club",
  description: "Night Club website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />

        {children}
        <NewsletterForm />
        <Footer />
      </body>
    </html>
  );
}
