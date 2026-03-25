import type {Translation} from "..";

export default {
    "Bienvenue !": "Welcome!",
    Commencer: "Start",
    "Bonjour {name}": (name: string) => `Hello ${name}`,
} satisfies Translation;
