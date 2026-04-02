import { ArrowRight, Zap } from "lucide-react";

const SolutionSection = () => (
  <section className="relative py-24 md:py-32">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Build prototypes that <span className="text-gradient-primary">actually work</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Matter turns your ideas into working prototypes directly in your real codebase. Test with real data. Share instantly. Ship faster.
        </p>
      </div>

      {/* Feature card */}
      <div className="relative rounded-2xl border border-border bg-card p-8 md:p-12 max-w-2xl mx-auto card-hover">
        <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-mono text-muted-foreground">From idea to working prototype</span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          In minutes, not weeks
        </p>
        <p className="text-muted-foreground mb-8">
          Go from concept to clickable, data-driven prototype without writing a single line of code.
        </p>
        <a
          href="#waitlist"
          className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          Join Waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
);

export default SolutionSection;
