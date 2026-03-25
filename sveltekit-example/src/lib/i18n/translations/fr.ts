import type {DefaultTranslation} from "@les3dev/i18n";

export default {
    "Bienvenue !": "Bienvenue !",
    Commencer: "Commencer",
    "Bonjour {name}": (name: string) => `Bonjour ${name}`,
    "Ça marche aussi en JS !": "Ça marche aussi en JS !",
} satisfies DefaultTranslation;
