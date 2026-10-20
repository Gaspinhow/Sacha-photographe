"use client";
import React from 'react';
import Link from 'next/link';
import Photo from "../../components/Photo";
import { projects } from "../../data/projects";
import { useLanguage } from "../context/LanguageContext";

export default function ReportageGrid() {
  const { lang } = useLanguage();
  const realProjects = projects ? projects.filter(p => p.category === "reportage") : [];

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-4 md:px-12 lg:px-20 text-black font-serif">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-6 max-w-7xl mx-auto">
        {realProjects.map((item, index) => {
          const cardTitle = (lang === 'EN' && item.titleEN) ? item.titleEN : item.title;
          return (
          <Link key={item.id} href={`/reportage/${item.id}`} className="group block w-full text-center">
            {/* Même format pour tous les cadres */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 shadow-sm mb-4 mx-auto">
              <Photo
                src={item.coverImage || (item.images && item.images[0])}
                alt={cardTitle}
                fill
                className="object-cover md:group-hover:scale-105 transition-transform duration-[2s]"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 4}
              />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black font-medium text-center px-2">{cardTitle}</p>
          </Link>
          );
        })}
      </div>
    </main>
  );
}
