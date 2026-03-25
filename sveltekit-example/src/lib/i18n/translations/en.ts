import type fr from "./fr";

export default {
  "Bienvenue !": "Welcome!",
  Commencer: "Start",
  "Bonjour %name": (name: string) => `Hello ${name}`,
} satisfies typeof fr;
