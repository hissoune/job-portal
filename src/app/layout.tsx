
import "../app/globals.css";
import Navbar from "../app/components/Navbar";

export const metadata = {
  title: "Jobify",
  description: "Generated by Khalid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body>
       
        {children}
      </body>
    </html>
  );
}
