
"use client";

import { useState } from "react";
import { Search, Loader2, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VillaSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function VillaSearch({ onSearch, isSearching }: VillaSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-16 px-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-card/80 border border-white/10 rounded-xl px-4 py-2 focus-within:ring-2 ring-primary/30 transition-all shadow-xl">
          <Compass className="w-5 h-5 text-primary/60 mr-4" />
          <Input
            type="text"
            placeholder="Search for luxury villas, modern estates, coastal mansions..."
            className="flex-1 bg-transparent border-none text-white placeholder:text-muted-foreground focus-visible:ring-0 h-12 text-lg font-body"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isSearching || !query.trim()}
            className="ml-4 bg-primary text-primary-foreground h-10 w-10 rounded-lg flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
            {['Modernist', 'Mediterranean', 'Glass House', 'Beachfront'].map((tag) => (
                <button
                    key={tag}
                    type="button"
                    onClick={() => {
                        setQuery(tag);
                        onSearch(tag);
                    }}
                    className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-white/5 px-3 py-1 rounded-full bg-white/5"
                >
                    {tag}
                </button>
            ))}
        </div>
      </form>
    </div>
  );
}
