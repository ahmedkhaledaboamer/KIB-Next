"use client";

import React from "react";

export default function SectorCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-[clamp(180px,25vw,300px)] w-full bg-gray-300" />

      {/* Content Skeleton */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title Skeleton */}
        <div className="h-[clamp(1.5rem,2.5vw,3.5rem)] w-3/4 bg-gray-200 rounded-lg mb-2" />

        {/* Description Skeleton */}
        <div className="space-y-2 flex-grow">
          <div className="h-[clamp(1rem,2vw,2rem)] w-full bg-gray-200 rounded" />
          <div className="h-[clamp(1rem,2vw,2rem)] w-5/6 bg-gray-200 rounded" />
          <div className="h-[clamp(1rem,2vw,2rem)] w-4/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

