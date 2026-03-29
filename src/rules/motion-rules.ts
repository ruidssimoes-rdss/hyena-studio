import type { Rule } from "./types"

export const motionRules: Rule[] = [
  {
    id: "motion-max-duration",
    name: "Max duration",
    scope: "motion",
    severity: "info",
    condition: (tokens) => tokens.motion.duration.slow > 400,
    message: "Slowest animation is above 400ms.",
    why: "Animations over 400ms feel sluggish.",
  },
]
