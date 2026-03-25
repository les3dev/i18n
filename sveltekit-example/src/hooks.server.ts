import {i18n} from "$lib/i18n";
import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    event.locals.locale = "fr";
    event.locals.translate = (key, ...args) => 
        i18n.translate(event.locals.locale, key, ...args);

    return resolve(event);
};
