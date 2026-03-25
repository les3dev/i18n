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
export function get_locale_from_headers(headers, i18n) {
    const header = headers.get("accept-language");
    if (!header)
        return i18n.default_locale;
    const languages = header
        .split(",")
        .map((part) => {
        const [lang, q = "q=1"] = part.trim().split(";");
        const quality = parseFloat(q.replace("q=", "")) || 1;
        return { lang: lang.split("-")[0].toLowerCase(), quality };
    })
        .sort((a, b) => b.quality - a.quality);
    for (const { lang } of languages) {
        if (i18n.locales.includes(lang)) {
            return lang;
        }
    }
    return i18n.default_locale;
}
