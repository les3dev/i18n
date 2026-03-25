import { getContext, setContext } from "svelte";
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
export function create_i18n_context(registration) {
    const { translate } = registration;
    const context_key = Symbol();
    function create_context(initialLocale) {
        let locale = $state(initialLocale);
        return {
            get locale() {
                return locale;
            },
            set locale(newLocale) {
                locale = newLocale;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            t(key, ...args) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return translate(locale, key, ...args);
            },
        };
    }
    return {
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
        get_i18n_context: () => getContext(context_key),
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
        set_i18n_context: (get_locale) => setContext(context_key, create_context(get_locale())),
    };
}
