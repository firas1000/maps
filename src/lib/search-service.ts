
export type VillaImage = {
  id: string;
  url: string;
  title: string;
  source: string;
  width: number;
  height: number;
};

/**
 * Simulates a DuckDuckGo image search.
 * In a real scenario, this would call a server action that scrapes or uses an API.
 */
export async function searchVillaImages(query: string): Promise<VillaImage[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For the purpose of this prototype, we'll return a set of high-quality mock data
  // based on common luxury villa keywords.
  const seeds = ['modern', 'pool', 'infinity', 'coast', 'mansion', 'interior', 'balcony', 'garden', 'night', 'sunset', 'glass', 'concrete'];
  
  return Array.from({ length: 12 }).map((_, i) => {
    const seed = seeds[i % seeds.length];
    const width = 800 + Math.floor(Math.random() * 400);
    const height = 600 + Math.floor(Math.random() * 600);
    const id = `villa-${query.replace(/\s+/g, '-')}-${i}`;
    
    return {
      id,
      url: `https://picsum.photos/seed/${seed}-${i}/${width}/${height}`,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Architectural Detail ${i + 1}`,
      source: "DuckDuckGo Visual Search",
      width,
      height
    };
  });
}
