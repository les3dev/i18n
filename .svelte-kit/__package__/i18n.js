/**
 * Registers translations for internationalization.
 *
 * Returns an i18n object with a type-safe translate function and _types used to create typesafe helpers (like `create_i18n_context`).
 *
 * @param translations - An object mapping locale codes to translation maps
 * @param default_locale - The default locale to use when a key is missing
 * @returns An i18n object with translate function and type information
 *
 * @example
 * ```ts
 * import {register_translations} from "@les3dev/i18n";
 * import fr from "./translations/fr";
 * import en from "./translations/en";

 * export const i18n = register_translations({fr, en}, "fr");
 * export const {translate} = i18n;
 *
 * export type Locale = Parameters<typeof translate>[0];
 * export type Translation = typeof fr;
 *
 * // Use the translate function directly
 * i18n.translate("en", "greeting"); // "Hello"
 * i18n.translate("fr", "greeting"); // "Bonjour"
 * i18n.translate("en", "greet", "World"); // "Hello, World!"
 * ```
 *
 * Configure the default translation by returning an object satisfying DefaultTranslation.
 *
 * @example
 * ```ts
 * // fr.ts
 * export default {
 *     "Bienvenue !": "Bienvenue !",
 *     Commencer: "Commencer",
 *     "Bonjour {name}": (name: string) => `Bonjour ${name}`,
 * } satisfies DefaultTranslation;
 * ```
 *
 * Other translations can use Translation exported from the code above.
 *
 * @example
 * ```ts
 * // en.ts
 * import type {Translation} from "..";
 *
 * export default {
 *     "Bienvenue !": "Welcome!",
 *     Commencer: "Start",
 *     "Bonjour {name}": (name: string) => `Hello ${name}`,
 * } satisfies Translation;
 * ```
 */
export function register_translations(translations, default_locale) {
    function translate(locale, key, ...args) {
        const dict = (translations[locale] ?? translations[default_locale]);
        const value = dict[key];
        if (value === undefined) {
            throw new Error(`Missing key '${String(key)}' for locale '${locale}'.`);
        }
        if (typeof value === "string") {
            return value;
        }
        return value(...args);
    }
    return {
        translate,
        locales: Object.keys(translations),
        default_locale,
        _types: undefined,
    };
}
