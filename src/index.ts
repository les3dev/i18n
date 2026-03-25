type TranslationFn = (...args: never[]) => string;
type TranslationValue = string | TranslationFn;
export type TranslationMap = Record<string, TranslationValue>;

export type TranslationArgs<T extends TranslationValue> = T extends (...args: infer Args) => string ? Args : never[];

type I18nRegistration = {
    _types: {locale: string; map: TranslationMap};
};

export type TranslateFn<TReg extends I18nRegistration> = {
    <K extends keyof TReg["_types"]["map"]>(key: K, ...args: TranslationArgs<TReg["_types"]["map"][K]>): string;
};

export function register_translations<
    const TTranslations extends Record<string, TranslationMap>,
    TDefaultLocale extends keyof TTranslations & string,
>(translations: TTranslations, defaultLocale: TDefaultLocale) {
    type TLocale = keyof TTranslations & string;
    type TDefault = TTranslations[TDefaultLocale];

    function translate<K extends keyof TDefault>(
        locale: TLocale,
        key: K,
        ...args: TranslationArgs<TDefault[K]>
    ): string {
        const dict = (translations[locale] ?? translations[defaultLocale]) as TDefault;
        const value = dict[key as string];

        if (value === undefined) {
            throw new Error(`Missing key '${String(key)}' for locale '${locale}'.`);
        }
        if (typeof value === "string") {
            return value;
        }
        return (value as TranslationFn)(...(args as never[]));
    }

    // Expose TLocale and TDefault as phantom type tokens for createI18nContext
    return {
        translate,
        _types: undefined as unknown as {locale: TLocale; map: TDefault},
    };
}
