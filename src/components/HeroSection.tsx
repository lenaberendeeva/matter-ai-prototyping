import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 bg-glow" />
    <div className="absolute inset-0 bg-grid opacity-30" />
    
    <div className="container relative z-10 text-center py-24 md:py-32">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-up">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
        AI-powered prototyping tool for product teams
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <span className="text-gradient-primary">Matter</span>
        <span className="text-foreground"> by JetBrains</span>
      </h1>

      {/* Subheadline */}
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        Prototype real features directly in your codebase and validate new ideas faster than ever with AI agents. No coding required.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <button className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:opacity-90">
          Join Waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 text-base font-medium text-secondary-foreground transition-all hover:bg-muted">
          <Play className="h-4 w-4" />
          Watch Demo
        </button>
      </div>
    </div>
  </section>
);

export default HeroSection;
