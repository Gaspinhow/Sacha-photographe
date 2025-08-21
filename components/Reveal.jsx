"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children, delay=0 }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ el.classList.add("in"); io.unobserve(el); }
      });
    },{ threshold: .15 });
    io.observe(el);
    return ()=> io.disconnect();
  },[delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}
