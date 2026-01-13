import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files
    // - Files with extensions
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};