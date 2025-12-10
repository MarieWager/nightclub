import "./globals.css";
import Nav from "./_components/Nav.jsx";
import Footer from "./_components/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
