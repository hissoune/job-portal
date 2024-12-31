import "../globals.css";

export const metadata = {
  title: "Authentication",
  description: "Login and Register pages",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    
        <div >    

            {children}

        </div>
       
  );
}
