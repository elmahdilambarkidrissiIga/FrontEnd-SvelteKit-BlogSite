import * as cookie from 'cookie'

export const handle = async ({ event, resolve }) => {

    const cookies = cookie.parse(event.request.headers.get("cookie") || "")
    event.locals.user = cookies
    if (!cookies.jwt) {
        event.locals.user.authenticated = false
    } else {
        event.locals.user.authenticated = true
    }
    const response = await resolve(event);

    const body = await response
    return body
}

export const getSession = async (request) => {
    const user = request.locals.user
    const auth = request.locals.user.authenticated
    return {
        user,
        auth,
    }
}