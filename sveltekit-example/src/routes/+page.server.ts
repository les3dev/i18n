import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = ({locals}) => {
    return {
        serverGreeting: locals.translate("fr", "Bonjour %name", "Server"),
    };
};
