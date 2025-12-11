import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/auth-utils";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { getNewAccessToken } from "./services/auth/auth.service";
export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname
    const hasTokenRefreshedParam = request.nextUrl.searchParams.has('tokenRefreshed');

    // If coming back after token refresh, remove the param and continue
    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    }

    const tokenRefreshResult = await getNewAccessToken();

    // If token was refreshed, redirect to same page to fetch with new token
    if (tokenRefreshResult?.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    }

    const accessToken = request.cookies.get("accessToken")?.value || null
    let userRole: UserRole | null = null

    if (accessToken) {
        const verifiedToken: string | JwtPayload = jwt
            .verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

        if (typeof verifiedToken === "string") {
            cookieStore.delete("accessToken")
            cookieStore.delete("refreshToken")
            return NextResponse.redirect(new URL("/login", request.url))
        }

        userRole = verifiedToken.role
    }

    const routerOwner = getRouteOwner(pathname)

    const isAuth = isAuthRoute(pathname)

    if (accessToken && isAuth) return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))

    if (routerOwner === null) return NextResponse.next()

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (routerOwner === "COMMON") return NextResponse.next()

    if (routerOwner === "ADMIN") {
        if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}