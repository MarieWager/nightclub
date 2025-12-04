
import "./globals.css";
import Nav from "../app/_components/Nav.jsx"


export const metadata = {
  title: "Night Club",
  description: "Night Club website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav/>

      
      
        {children}
      </body>
    </html>
  );
}
