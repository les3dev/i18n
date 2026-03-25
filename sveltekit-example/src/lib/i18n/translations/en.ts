import type {Translation} from "..";

export default {
    "Bienvenue !": "Welcome!",
    Commencer: "Start",
    "Bonjour {name}": (name: string) => `Hello ${name}`,
    "Ça marche aussi en JS !": "Also works in js!",
} satisfies Translation;
