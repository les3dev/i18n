import {i18n, type Locale} from "$lib/i18n";
import {get_locale_from_headers} from "@les3dev/i18n";
import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const cookieLocale = event.cookies.get("locale");

    if (cookieLocale && i18n.locales.includes(cookieLocale as Locale)) {
        event.locals.locale = cookieLocale as Locale;
    } else {
        event.locals.locale = get_locale_from_headers(event.request.headers, i18n);
    }

    event.locals.translate = (key, ...args) => i18n.translate(event.locals.locale, key, ...args);

    return resolve(event);
};
