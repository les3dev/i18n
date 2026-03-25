import {translate} from "$lib/i18n";
import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    event.locals.locale = "fr";
    event.locals.translate = translate;

    return resolve(event);
};
