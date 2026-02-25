import { Rocket, Users, CheckCircle } from "lucide-react";

const outcomes = [
  {
    icon: Rocket,
    title: "Speed & Validation",
    items: [
      "Minutes from idea to working prototype",
      "Test with real data before building",
      "Validate faster, fail cheaper",
    ],
  },
  {
    icon: Users,
    title: "Team Efficiency",
    items: [
      "Unblock designers and PMs from waiting",
      "Fewer meetings, more building",
      "Developers focus on complex problems",
    ],
  },
  {
    icon: CheckCircle,
    title: "Quality & Alignment",
    items: [
      "Ship what you designed",
      'No more "lost in translation" moments',
      "Less rework, more innovation",
    ],
  },
];

const OutcomesSection = () => (
  <section className="relative py-24 md:py-32">
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          What you <span className="text-gradient-primary">get</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {outcomes.map((o, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-8 card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-5">
              <o.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{o.title}</h3>
            <ul className="space-y-3">
              {o.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OutcomesSection;
