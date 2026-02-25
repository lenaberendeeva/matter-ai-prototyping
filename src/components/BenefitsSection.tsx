import { Wand2, GitBranch, Share2 } from "lucide-react";

const benefits = [
  {
    icon: Wand2,
    title: "Designers and product managers become builders",
    description:
      "Instead of creating backlog issues, modify the real app with AI assistance. Test your ideas with actual data and user flows, not static mockups.",
  },
  {
    icon: GitBranch,
    title: "Streamline the handoff process",
    description:
      "Hand off working code and prototypes, not just specs. Developers can build on your foundation instead of starting from scratch.",
  },
  {
    icon: Share2,
    title: "No localhost 3000 and screen sharing anymore",
    description:
      "Share working prototypes with teammates and customers instantly. Collaborate and iterate in real time, not through endless screen sharing sessions.",
  },
];

const BenefitsSection = () => (
  <section className="relative py-24 md:py-32">
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Why choose <span className="text-gradient-primary">Matter</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="group relative rounded-2xl border border-border bg-card p-8 card-hover"
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-5">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
