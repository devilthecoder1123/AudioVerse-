import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface BookDescriptionProps {
  book: Audiobook;
}

export function BookDescription({ book }: BookDescriptionProps) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <Card className="glass-card">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-6">About This Audiobook</h3>
          
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {book.description || `Experience the captivating world of "${book.title}" in this professionally narrated audiobook. 
              This ${book.genre.toLowerCase()} masterpiece takes you on an unforgettable journey through expertly crafted storytelling 
              and immersive audio production. With crystal-clear narration and engaging character voices, this audiobook brings 
              the story to life in ways that will keep you listening from start to finish.`}
            </p>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">What Listeners Say</h4>
                <p className="text-muted-foreground text-sm">
                  &quot;An absolutely captivating performance that brings every character to life. 
                  The narrator&apos;s voice perfectly captures the essence of the story.&quot;
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-primary">Perfect For</h4>
                <p className="text-muted-foreground text-sm">
                  Fans of {book.genre.toLowerCase()}, audiobook enthusiasts, and anyone looking 
                  for their next great listen during commutes or relaxation time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
