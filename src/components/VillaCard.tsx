
"use client";

import Image from "next/image";
import { VillaImage } from "@/lib/search-service";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface VillaCardProps {
  image: VillaImage;
  index: number;
  onClick: (image: VillaImage) => void;
}

export function VillaCard({ image, index, onClick }: VillaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="masonry-item group relative overflow-hidden rounded-lg bg-muted cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-reveal"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(image)}
    >
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setIsLoaded(true)}
          data-ai-hint="luxury villa"
        />
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
        </div>
      )}

      <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-1">VelvetStay Collection</p>
          <h3 className="font-headline text-lg text-white leading-tight mb-2 line-clamp-2">{image.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Search className="w-3 h-3" />
            <span>Discover stylistic details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
