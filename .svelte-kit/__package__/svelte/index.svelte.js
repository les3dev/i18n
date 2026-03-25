import { getContext, setContext } from "svelte";
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
        get_i18n_context: () => getContext(context_key),
        set_i18n_context: (get_locale) => setContext(context_key, create_context(get_locale())),
    };
}
