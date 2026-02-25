import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="relative py-24 md:py-32">
    <div className="container">
      <div className="relative rounded-2xl border border-border bg-card overflow-hidden max-w-3xl mx-auto">
        {/* Glow */}
        <div className="absolute inset-0 bg-glow opacity-50" />
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="relative z-10 text-center px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to prototype like the future?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Be among the first to experience AI-powered prototyping
          </p>
          <button className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:opacity-90">
            Join Waitlist
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;
