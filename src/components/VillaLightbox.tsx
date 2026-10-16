
"use client";

import { VillaImage } from "@/lib/search-service";
import { X, Maximize2, Sparkles, MapPin } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { VillaAnalysisPanel } from "./VillaAnalysisPanel";
import { useState } from "react";

interface VillaLightboxProps {
  image: VillaImage | null;
  onClose: () => void;
}

export function VillaLightbox({ image, onClose }: VillaLightboxProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute top-6 right-6 z-[110] flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-accent hover:bg-accent/90 border-none text-white gap-2 font-bold tracking-wide hidden sm:flex"
          onClick={() => setShowAnalysis(!showAnalysis)}
        >
          <Sparkles className="w-4 h-4" />
          {showAnalysis ? "Hide Analysis" : "Analyze Architecture"}
        </Button>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className={`w-full h-full flex flex-col lg:flex-row transition-all duration-700 ${showAnalysis ? 'lg:gap-0' : 'lg:gap-0'}`}>
        {/* Cinematic Image View */}
        <div className={`relative flex-1 flex items-center justify-center p-4 lg:p-12 transition-all duration-700 ${showAnalysis ? 'lg:w-2/3' : 'lg:w-full'}`}>
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] group shadow-2xl shadow-black/50 overflow-hidden rounded-xl border border-white/5">
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover"
              priority
              data-ai-hint="luxury architecture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
               <h2 className="font-headline text-3xl text-white mb-2">{image.title}</h2>
               <div className="flex items-center gap-2 text-primary/80 text-sm font-medium tracking-widest uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Exclusive Location</span>
               </div>
            </div>
          </div>
        </div>

        {/* Analysis Sidebar */}
        {showAnalysis && (
          <div className="w-full lg:w-1/3 h-full bg-card border-l border-white/10 animate-in slide-in-from-right duration-500 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-white/5">
              <h3 className="font-headline text-2xl text-primary mb-1">Architectural Analysis</h3>
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-bold">VelvetStay Stylistic Context Tool</p>
            </div>
            
            <ScrollArea className="flex-1 p-8">
               <VillaAnalysisPanel image={image} />
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Floating UI Elements */}
      {!showAnalysis && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.4em] mb-2 font-bold">Press ESC to exit gallery</p>
          <div className="h-0.5 w-12 bg-primary/30 mx-auto"></div>
        </div>
      )}
    </div>
  );
}
