import type {DefaultTranslation} from "@les3dev/i18n";

export default {
    "Bienvenue !": "Bienvenue !",
    Commencer: "Commencer",
    "Bonjour {name}": (name: string) => `Bonjour ${name}`,
} satisfies DefaultTranslation;
