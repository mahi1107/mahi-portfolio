import { cn } from "@/lib/utils";
import React from "react";

interface RadialGlowBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const Component = ({ children, className }: RadialGlowBackgroundProps) => {
  return (
    <div className={cn("min-h-screen w-full bg-[#020617] relative", className)}>
      {/* Dark Radial Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, rgba(30, 41, 59, 0.5), transparent)`,
        }}
      />
      {/* Content Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

