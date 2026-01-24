"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LazyPopup = dynamic(() => import("../PopupContent"), {
  ssr: false,
});

export default function PopupLazy() {
  const [show, setShow] = useState(false);

  async function closeAfterTime(sec: number) {
    setTimeout(() => {
      setShow(false);
    }, sec * 1000);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("💡 Popup loaded after 5-second delay");
      setShow(true);
      closeAfterTime(5);
    }, 8000); // Wait 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return show ? <LazyPopup /> : null;
}
