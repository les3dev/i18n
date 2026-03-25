type TranslationArgs<T> = T extends (...args: infer Args) => string ? Args : never[];
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
type I18nT<TMap extends Record<string, unknown>> = UnionToIntersection<keyof TMap extends infer K ? K extends keyof TMap ? (key: K, ...args: TranslationArgs<TMap[K]>) => string : never : never>;
type InferLocale<R extends {
    _types: {
        locale: string;
    };
}> = R["_types"]["locale"];
type InferMap<R extends {
    _types: {
        map: Record<string, unknown>;
    };
}> = R["_types"]["map"];
type I18nContext<TLocale extends string, TMap extends Record<string, unknown>> = {
    locale: TLocale;
    t: I18nT<TMap>;
};
type AnyRegistration = {
    _types: {
        locale: string;
        map: Record<string, unknown>;
    };
    translate: (...args: any[]) => string;
};
export declare function create_i18n_context<TReg extends AnyRegistration>(registration: TReg): {
    get_i18n_context: () => I18nContext<InferLocale<TReg>, InferMap<TReg>>;
    set_i18n_context: (get_locale: () => InferLocale<TReg>) => I18nContext<InferLocale<TReg>, InferMap<TReg>>;
};
export {};
