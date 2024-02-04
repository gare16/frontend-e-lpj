"use client";

import { useEffect } from "react";
// import { Metadata } from "next";
import SignIn from "./auth/signin/page";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "E-LPJ",
//   description: "Satu Data Indonesia, website BAPPENAS",
//   // other metadata
// };

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Function to get a cookie by name
    const getCookie = (name: string) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    // Usage: Get the value of a cookie named "myCookie"
    const myCookieValue = getCookie("token");

    if (myCookieValue) {
      router.push("/dashboard/dashboard");
    }
  }, []);
  return (
    <>
      <SignIn />
    </>
  );
}
