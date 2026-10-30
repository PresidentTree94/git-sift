type Signal = {
  signal: "Strong" | "Moderate" | "Thin" | "No public data";
  signalDescription: string;
  signalColor: string;
  signalBorder: string;
  pill: string;
}

export function getSignalData(score: number): Signal {
  switch (score) {
    case 4:
      return {
        signal: "Strong",
        signalDescription: "Depth, more than one project, documentation and recent activity all agree. Still read the projects below before the interview.",
        signalColor: "text-primary-300",
        signalBorder: "border-primary-400",
        pill: "bg-primary-600 text-background-50"
      }
    case 3:
      return {
        signal: "Moderate",
        signalDescription: "Real public evidence, but not a pattern yet. Pair it with a code walkthrough or take-home — and read the missing check below before deciding.",
        signalColor: "text-[oklch(.85_.14_75)]",
        signalBorder: "border-accent-400",
        pill: "bg-accent-400 text-foreground-950"
      }
    case 2:
    case 1:
      return {
        signal: "Thin",
        signalDescription: "Very little public code. That is normal early in a career and normal for engineers whose work sits behind a firewall. Ask for a private repo, portfolio, or take-home.",
        signalColor: "text-[oklch(.77_.1_25)]",
        signalBorder: "border-secondary-400",
        pill: "bg-secondary-400 text-foreground-950"
      }
    default:
      return {
        signal: "No public data",
        signalDescription: "No public repositories, so no conclusion is drawn. Ask for work samples rather than reading anything into it.",
        signalColor: "text-foreground-300",
        signalBorder: "border-foreground-600",
        pill: "bg-foreground-700 text-background-50"
      }
  }
}