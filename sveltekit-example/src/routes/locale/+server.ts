// simple example to set locale on the server in a cookie
export const POST = async ({request, cookies}) => {
    const {locale} = await request.json();
    cookies.set("locale", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
    });
    return new Response(null, {status: 204});
};
