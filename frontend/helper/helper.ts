import cookie from 'cookie';

export function parseCookie( req: any ) {
    const headerCookie = req.headers.cookie || '';
    return cookie.parse( headerCookie )
}
