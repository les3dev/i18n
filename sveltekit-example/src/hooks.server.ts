import {i18n} from "$lib/i18n";
import {get_locale_from_headers} from "@les3dev/i18n";
import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    event.locals.locale = get_locale_from_headers(event.request.headers, i18n);
    event.locals.translate = (key, ...args) => i18n.translate(event.locals.locale, key, ...args);

    return resolve(event);
};
