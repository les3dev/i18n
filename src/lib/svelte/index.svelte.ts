import {getContext, setContext} from "svelte";

type TranslationArgs<T> = T extends (...args: infer Args) => string ? Args : never[];

type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

type I18nT<TMap extends Record<string, unknown>> = UnionToIntersection<
    keyof TMap extends infer K
        ? K extends keyof TMap
            ? (key: K, ...args: TranslationArgs<TMap[K]>) => string
            : never
        : never
>;

// Extracts phantom types packed into the _types field returned by registerTranslations
type InferLocale<R extends {_types: {locale: string}}> = R["_types"]["locale"];
type InferMap<R extends {_types: {map: Record<string, unknown>}}> = R["_types"]["map"];

type I18nContext<TLocale extends string, TMap extends Record<string, unknown>> = {
    locale: TLocale;
    t: I18nT<TMap>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRegistration = {_types: {locale: string; map: Record<string, unknown>}; translate: (...args: any[]) => string};

export function create_i18n_context<TReg extends AnyRegistration>(registration: TReg) {
    type TLocale = InferLocale<TReg>;
    type TMap = InferMap<TReg>;
    type Ctx = I18nContext<TLocale, TMap>;

    const {translate} = registration;
    const context_key = Symbol();

    function create_context(initialLocale: TLocale): Ctx {
        let locale = $state(initialLocale);

        return {
            get locale() {
                return locale;
            },
            set locale(newLocale: TLocale) {
                locale = newLocale;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            t(key: any, ...args: any[]): string {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return translate(locale as any, key, ...args);
            },
        } as Ctx;
    }

    return {
        get_i18n_context: () => getContext<Ctx>(context_key),
        set_i18n_context: (get_locale: () => TLocale) => setContext(context_key, create_context(get_locale())),
    };
}
