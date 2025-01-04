"use client";
import Link from "next/link";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { VscGitStashApply } from "react-icons/vsc";
import { PiShareNetworkBold } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";

import Cookies from "js-cookie"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState({id:"", name: "", email: "",role: "" }); 
  const [error, setError] = useState("");
 const router = useRouter();
  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser); 
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.warn("No user data found in cookies.");
      setUser(null)
    }
  }, []);

  const logout = async ()=>{
    try {
      const res = await fetch("/api/auth/logout", {
        cache: "no-store",

        method: "DELETE",
             });

      const data = await res.json();

      if (res.ok) { 
        Cookies.remove("user_data");
        setUser(null)

        router.push("/login");

      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <p className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition duration-300">
            Jobify
          </p>
        </Link>
        {!user?(
    
            <div className="flex items-center gap-6">
            <Link href="/login">
              <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                <FaSignInAlt className="text-lg" />
                Login
              </p>
            </Link>
            <Link href="/register">
              <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                <FaUser className="text-lg" />
                Register
              </p>
            </Link>
          </div>

        ):
        (
        <div className="flex items-center gap-6 ">
          {user.role == "condidat" ?(
            <div className="flex items-center gap-6">
                        <Link href="/jobs">
                          <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                          <PiShareNetworkBold className="text-2xl" />
      
                            Jobs
                          </p>
                        </Link>
                        <Link href="/applications">
                          <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                          <VscGitStashApply className="text-2xl" />
                            Applications
                          </p>
                        </Link>
                      </div>
      
              ):
              <div className="flex items-center gap-6">
                        <Link href="/jobs">
                          <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                          <PiShareNetworkBold className="text-2xl" />
      
                            homa
                          </p>
                        </Link>
                        <Link href="/applications">
                          <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
                          <VscGitStashApply className="text-2xl" />
                            ana
                          </p>
                        </Link>
                      </div>
            
            }
            <div className="flex items-center gap-6">
                        <button onClick={logout}>
                          <p className="flex items-center gap-2 border-gray-300  border-2 p-2 rounded-e-lg  text-gray-300 hover:text-red-400 transition duration-300">
                          Log Out
                          <IoMdLogOut className="text-2xl" />
                          
                          </p>
                        </button>
                        
                      </div>

        </div>
        )
        
        
        
        }
       
      </div>
    </nav>
  );
}
