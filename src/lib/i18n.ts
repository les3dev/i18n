/**
 * Used to make sure that the default translation object is properly typed.
 *
 * @example
 * import type {DefaultTranslation} from "@les3dev/i18n";
 *
 * export default {
 *     "Bienvenue !": "Bienvenue !",
 *     Commencer: "Commencer",
 *     "Bonjour {name}": (name: string) => `Bonjour ${name}`,
 * } satisfies DefaultTranslation;
 */
export type DefaultTranslation = Record<string, string | ((...args: never[]) => string)>;

type TranslationFn = (...args: never[]) => string;
type TranslationValue = string | TranslationFn;

export type TranslationMap = Record<string, TranslationValue>;
export type TranslationArgs<T extends TranslationValue> = T extends (...args: infer Args) => string ? Args : never[];

type I18nRegistration = {
    _types: {locale: string; map: TranslationMap};
};

export interface I18n<
    TLocale extends string,
    TMap extends TranslationMap,
> {
    translate: <K extends keyof TMap>(locale: TLocale, key: K, ...args: TranslationArgs<TMap[K]>) => string;
    locales: TLocale[];
    default_locale: TLocale;
    _types: {locale: TLocale; map: TMap};
}

/**
 * A type-safe translate function with locale.
 *
 * Can be used to type the function in app.d.ts for instance.
 *
 * @example
 * ```ts
 * import type {TranslateFn} from "@les3dev/i18n";
 * import type {i18n} from "$lib/i18n";
 *
 * declare global {
 *     namespace App {
 *         // interface Error {}
 *         interface Locals {
 *             locale: "fr" | "en";
 *             translate: TranslateFn<typeof i18n>;
 *         }
 *         // interface PageData {}
 *         // interface PageState {}
 *         // interface Platform {}
 *     }
 * }
 * ```
 * @example
 * // hooks.server.ts
 * import {i18n} from "$lib/i18n";
 * import type {Handle} from "@sveltejs/kit";
 *
 * export const handle: Handle = async ({event, resolve}) => {
 *     event.locals.locale = "fr";
 *     // translate is properly typed
 *     event.locals.translate = (key, ...args) =>
 *         i18n.translate(event.locals.locale, key, ...args);
 *
 *     return resolve(event);
 * };
 */
export type TranslateFn<TReg extends I18nRegistration> = {
    <K extends keyof TReg["_types"]["map"]>(key: K, ...args: TranslationArgs<TReg["_types"]["map"][K]>): string;
};

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
 * For monorepo compatibility, use explicit type annotation with the `I18n` interface:
 * ```ts
 * import {register_translations, type I18n} from "@les3dev/i18n";
 * import fr from "./translations/fr";
 * import en from "./translations/en";
 *
 * export const i18n: I18n<"fr" | "en", typeof fr> = register_translations({fr, en}, "fr");
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
export function register_translations<
    const TTranslations extends Record<string, TranslationMap>,
    TDefaultLocale extends keyof TTranslations & string,
>(translations: TTranslations, default_locale: TDefaultLocale) {
    type TLocale = keyof TTranslations & string;
    type TDefault = TTranslations[TDefaultLocale];

    function translate<K extends keyof TDefault>(
        locale: TLocale,
        key: K,
        ...args: TranslationArgs<TDefault[K]>
    ): string {
        const dict = (translations[locale] ?? translations[default_locale]) as TDefault;
        const value = dict[key as string];

        if (value === undefined) {
            throw new Error(`Missing key '${String(key)}' for locale '${locale}'.`);
        }
        if (typeof value === "string") {
            return value;
        }
        return (value as TranslationFn)(...(args as never[]));
    }

    return {
        translate,
        locales: Object.keys(translations) as (keyof TTranslations & string)[],
        default_locale,
        _types: undefined as unknown as {locale: TLocale; map: TDefault},
    };
}
