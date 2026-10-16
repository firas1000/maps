
"use client";

import { useState, useEffect } from "react";
import { analyzeVillaDetails, AnalyzeVillaDetailsOutput } from "@/ai/flows/analyze-villa-details";
import { VillaImage } from "@/lib/search-service";
import { Loader2, Sparkles, Layout, Gem, Palette, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface VillaAnalysisPanelProps {
  image: VillaImage;
}

export function VillaAnalysisPanel({ image }: VillaAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<AnalyzeVillaDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function runAnalysis() {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch the actual base64 of the image.
        // For this demo, we'll use a placeholder logic or fetch the image URL as a proxy.
        const response = await fetch(image.url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const result = await analyzeVillaDetails({ photoDataUri: base64data });
          setAnalysis(result);
          setIsLoading(false);
        };
      } catch (err) {
        console.error(err);
        setError("Failed to analyze image architectural details.");
        setIsLoading(false);
      }
    }

    runAnalysis();
  }, [image]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium tracking-wide text-primary/70 animate-pulse">Consulting VelvetStay AI Curator...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-destructive/10 rounded-lg border border-destructive/20">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-8 animate-reveal">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Info className="w-4 h-4" />
          <h4 className="text-xs uppercase tracking-widest font-bold">Curator's Summary</h4>
        </div>
        <p className="font-body text-base leading-relaxed text-muted-foreground italic border-l-2 border-primary/30 pl-4 py-1">
          "{analysis.summary}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Layout className="w-4 h-4" />
            <h4 className="text-xs uppercase tracking-widest font-bold">Architecture</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.architecturalStyles.map((style, i) => (
              <Badge key={i} variant="outline" className="border-primary/20 text-primary-foreground bg-primary/5 px-3 py-1">
                {style}
              </Badge>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Gem className="w-4 h-4" />
            <h4 className="text-xs uppercase tracking-widest font-bold">Luxury Details</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.luxuryFeatures.map((feature, i) => (
              <Badge key={i} variant="secondary" className="bg-secondary/50 border-white/5 hover:bg-secondary transition-colors">
                {feature}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Palette className="w-4 h-4" />
          <h4 className="text-xs uppercase tracking-widest font-bold">Color Palette</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {analysis.colorPalette.map((color, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 pr-3 rounded-full overflow-hidden border border-white/5">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center font-bold text-xs">0{i+1}</div>
              {color}
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>Real-time analysis powered by VelvetStay Vision AI</span>
        </div>
      </div>
    </div>
  );
}
