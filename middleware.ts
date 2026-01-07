export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
