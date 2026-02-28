import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";

export const superAdminNavItems: NavSection[] = [
    {
        items: [
            {
                title: "Dashboard",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
                roles: ["SUPER_ADMIN", "ADMIN"]
            }
        ]
    },
    {
        title: "User management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
                roles: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
                roles: ["SUPER_ADMIN", "ADMIN"]
            },
            {
                title: "Hosts",
                href: "/admin/dashboard/hosts-management",
                icon: "Users",
                roles: ["SUPER_ADMIN", "ADMIN"]
            }
        ]
    },
    {
        title: "Events management",
        items: [
            {
                title: "Events",
                href: "/admin/dashboard/events-management",
                icon: "Calendar",
                roles: ["SUPER_ADMIN", "ADMIN"]
            }
        ]
    },
    {
        title: "Events participants",
        items: [
            {
                title: "Event participants",
                href: "/admin/dashboard/event-participants-management",
                icon: "Users",
                roles: ["SUPER_ADMIN", "ADMIN"]
            }
        ]
    }
]

export const getNavItemByRole = (role: UserRole): NavSection[] => {

    switch (role) {
        case "SUPER_ADMIN":
            return superAdminNavItems;
        case "ADMIN":
            return superAdminNavItems;
        default:
            return [];
    }
}