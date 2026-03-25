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
/**
 * Creates a type-safe i18n Svelte context for internationalization.
 *
 * Use in a layout file to initialize the context, then use `get_i18n_context` in child components.
 *
 * @param registration - The i18n object from register_translations, used to infer types
 * @returns `set_i18n_context` and `get_i18n_context` functions
 *
 * @example
 * ```ts
 * // src/lib/i18n/context.svelte.ts
 * import {create_i18n_context} from "@les3dev/i18n/svelte";
 * import {i18n} from "./index"; // return from register_translations
 *
 * export const {get_i18n_context, set_i18n_context} = create_i18n_context(i18n);
 * ```
 *
 * @example
 * ```svelte
 * <!-- +layout.svelte -->
 * <script lang="ts">
 *     import {set_i18n_context} from "../i18n/context.svelte";
 *
 *     let {children} = $props();
 *     set_i18n_context(() => "fr"); // Initialize with default locale
 * </script>
 *
 * {@render children()}
 * ```
 *
 * @example
 * ```svelte
 * <!-- SomeComponent.svelte -->
 * <script lang="ts">
 *     import {get_i18n_context} from "../i18n/context.svelte";
 *
 *     const i18n = get_i18n_context();
 * </script>
 *
 * <h1>{i18n.t("greeting")}</h1>
 * <p>{i18n.t("greet", "World")}</p>
 * ```
 */
export declare function create_i18n_context<TReg extends AnyRegistration>(registration: TReg): {
    /**
     * Get the context, use `i18n.t` to translate messages and `i18n.locale` to get the current locale.
     *
     * @example
     * ```svelte
     * <!-- SomeComponent.svelte -->
     * <script lang="ts">
     *     import {get_i18n_context} from "../i18n/context.svelte";
     *
     *     const i18n = get_i18n_context();
     * </script>
     *
     * <h1>{i18n.t("greeting")}</h1>
     * <p>{i18n.t("greet", "World")}</p>
     * ```
     */
    get_i18n_context: () => I18nContext<InferLocale<TReg>, InferMap<TReg>>;
    /**
     * Initializes the svelte context (usually done in +layout.svelte).
     *
     * @param get_locale The initial locale when creating the context
     *
     * @example
     * ```svelte
     * <!-- +layout.svelte -->
     * <script lang="ts">
     *     import {set_i18n_context} from "../i18n/context.svelte";
     *
     *     let {children} = $props();
     *     set_i18n_context(() => "fr"); // Initialize with default locale
     * </script>
     *
     * {@render children()}
     * ```
     */
    set_i18n_context: (get_locale: () => InferLocale<TReg>) => I18nContext<InferLocale<TReg>, InferMap<TReg>>;
};
export {};
