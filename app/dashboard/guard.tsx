"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Guard({ children }: { children: React.ReactNode }) {
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

    if (!myCookieValue) {
      router.push("/");
    }
  }, []);
  return <>{children}</>;
}
