/**
 * Extracts the locale from the Accept-Language header.
 *
 * @param headers - The headers object from a Request
 * @param i18n - The i18n object from register_translations
 * @returns The detected locale
 *
 * @example
 * ```ts
 * import { get_locale_from_headers, register_translations } from "@les3dev/i18n";
 *
 * const i18n = register_translations({en: {...}, fr: {...}}, "en");
 * const locale = get_locale_from_headers(request.headers, i18n);
 * ```
 */
export declare function get_locale_from_headers<T extends string>(headers: Headers, i18n: {
    locales: readonly string[];
    default_locale: T;
}): T;
