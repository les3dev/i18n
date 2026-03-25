import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = ({locals}) => {
    return {
        server_greeting: locals.translate("Bonjour %name", "Server"),
    };
};
