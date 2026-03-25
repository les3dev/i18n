export default {
    "Bienvenue !": "Bienvenue !",
    Commencer: "Commencer",
    "Bonjour %name": (name: string) => `Bonjour ${name}`,
} satisfies Record<string, string | ((...args: never[]) => string)>;
