
import "../../app/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Jobify",
  description: "Generated by Khalid",
};

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
 <div>

  <div className="fcs">
                  { <Navbar  />}

        </div>
        {children}
 </div>
        
     
  );
}
