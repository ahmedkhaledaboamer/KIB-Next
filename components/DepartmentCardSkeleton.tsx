"use client";

import React from "react";

export default function DepartmentCardSkeleton() {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white/30 backdrop-blur-xl shadow-xl animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-[clamp(400px,40vw,600px)] overflow-hidden rounded-3xl bg-gray-300">
        {/* Gradient Overlay Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-400 via-gray-300/40 to-transparent" />

        {/* Info Skeleton */}
        <div className="absolute bottom-0 p-[clamp(1rem,3vw,3rem)] z-10 w-full">
          {/* Position / Title Skeleton */}
          <div className="h-[clamp(1.5rem, 2vw, 5rem)] w-3/4 bg-gray-200 rounded-lg mb-2" />

          {/* Description Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-[clamp(0.875rem, 1.5vw, 2rem)] w-full bg-gray-200 rounded" />
            <div className="h-[clamp(0.875rem, 1.5vw, 2rem)] w-5/6 bg-gray-200 rounded" />
            <div className="h-[clamp(0.875rem, 1.5vw, 2rem)] w-4/6 bg-gray-200 rounded" />
          </div>

          {/* Contact Buttons Skeleton */}
          <div className="flex flex-wrap gap-[clamp(0.5rem,1.5vw,1rem)] mt-2">
            <div className="h-[clamp(2rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)] bg-gray-200 rounded-full" />
            <div className="h-[clamp(2rem,3vw,3rem)] w-[clamp(6rem,10vw,10rem)] bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

