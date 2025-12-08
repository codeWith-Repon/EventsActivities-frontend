export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "HOST";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[]
}

export const authRoutes = ["/login", "/register", "/forgot-password",]

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password", "/my-events", "/create-event"],
    patterns: []
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: []
}

export const isAuthRoute = (pathname: string) => authRoutes.some((route: string) => route === pathname)

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) return true
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "ADMIN" | "SUPER_ADMIN" | "HOST" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN"
    if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON"
    return null
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") return "/admin/dashboard"
    if (role === "SUPER_ADMIN") return "/admin/dashboard"
    return "/"
}
