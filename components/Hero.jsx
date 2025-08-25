"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ajoutez vos 6 images ici (mettez vos fichiers dans public/images/)
const slides = [
  "/images/slidehero6.jpg",
  "/images/slidehero5.jpg",
  "/images/slidehero4.jpg",
  "/images/slidehero3.jpg",
  "/images/slidehero2.jpg",
  "/images/slidehero1.jpg",
];

export default function Hero(){
  const [i, setI] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setI(s => (s+1)%slides.length), 4000); // 4s
    return ()=> clearInterval(id);
  },[]);
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden pt-[72px] sm:pt-[80px] md:pt-[88px] lg:pt-[96px]">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={i}
            src={slides[i]}
            alt=""
            className="w-full h-full object-cover kenburns"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.8}}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
}
