"use client";

import { Star, Clock, Users } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-premium">AudioVerse</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
            <p className="text-muted-foreground">Crystal-clear audio with professional narrators and immersive sound design.</p>
          </div>

          <div className="glass-card p-8 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Unlimited Access</h3>
            <p className="text-muted-foreground">Listen anytime, anywhere. Download for offline listening and sync across devices.</p>
          </div>

          <div className="glass-card p-8 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
            <p className="text-muted-foreground">Join book clubs, share reviews, and discover recommendations from fellow listeners.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
