
"use client";

import { useState, useEffect } from "react";
import { VillaSearch } from "@/components/VillaSearch";
import { VillaCard } from "@/components/VillaCard";
import { VillaLightbox } from "@/components/VillaLightbox";
import { VillaImage, searchVillaImages } from "@/lib/search-service";
import { Diamond, Crown, Sparkles, Image as ImageIcon } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const [results, setResults] = useState<VillaImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState<VillaImage | null>(null);

  useEffect(() => {
    // Initial load with some "curated" results (placeholders)
    const initialImages: VillaImage[] = PlaceHolderImages.map(img => ({
      id: img.id,
      url: img.imageUrl,
      title: img.description,
      source: "VelvetStay Curator",
      width: 1200,
      height: 800
    }));
    setResults(initialImages);
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const searchResults = await searchVillaImages(query);
      setResults(searchResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Editorial Header */}
      <header className="relative pt-24 pb-16 text-center space-y-6 px-4">
        <div className="inline-flex items-center gap-2 mb-4 animate-reveal">
           <Diamond className="w-4 h-4 text-primary" strokeWidth={1.5} />
           <span className="text-xs uppercase tracking-[0.6em] text-primary font-bold">Premier Collection</span>
           <Diamond className="w-4 h-4 text-primary" strokeWidth={1.5} />
        </div>
        
        <h1 className="font-headline text-6xl md:text-8xl text-white tracking-tighter leading-none animate-reveal [animation-delay:200ms]">
          VelvetStay
        </h1>
        
        <p className="max-w-xl mx-auto font-body text-lg text-muted-foreground leading-relaxed animate-reveal [animation-delay:400ms]">
          Explore a curated digital portfolio of the world's most exclusive architectural marvels. Powered by DuckDuckGo and VelvetStay Vision AI.
        </p>

        <div className="flex items-center justify-center gap-8 pt-8 animate-reveal [animation-delay:600ms]">
            <div className="flex flex-col items-center gap-2">
                <Crown className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Exclusivity</span>
            </div>
            <div className="h-8 w-px bg-white/5"></div>
            <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Curated</span>
            </div>
            <div className="h-8 w-px bg-white/5"></div>
            <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">High Definition</span>
            </div>
        </div>
      </header>

      {/* Integrated Search */}
      <VillaSearch onSearch={handleSearch} isSearching={isSearching} />

      {/* Masonry Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="masonry-grid">
          {results.map((img, idx) => (
            <VillaCard 
              key={img.id} 
              image={img} 
              index={idx} 
              onClick={setSelectedImage}
            />
          ))}
        </div>
        
        {results.length === 0 && !isSearching && (
          <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl">
            <p className="text-muted-foreground font-headline text-2xl italic">No architectural masterpieces found for this search.</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-32 pt-16 border-t border-white/5 text-center">
        <div className="font-headline text-3xl text-primary opacity-30 mb-4 tracking-tight">VelvetStay</div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">Timeless Luxury • Worldwide Reach</p>
      </footer>

      {/* Cinematic Lightbox */}
      <VillaLightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </main>
  );
}
