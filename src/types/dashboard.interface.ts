import { UserRole } from "@/lib/auth-utils"


export interface NavItem {
    title: string,
    href: string,
    icon: string,
    badge?: string | number,
    description?: string
    roles: UserRole[]
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}

/* ---- Admin dashboard meta (GET /dashboard/meta-data) ---- */

export interface DashboardSummary {
    totalUsers: number;
    totalEvents: number;
    totalSales: number;
    totalRevenue: number;
}

export interface ChartPoint {
    date: string;
    total?: number | string;
    count?: number | string;
}

export interface EventDistributionItem {
    status: string;
    _count: { _all: number };
}

export interface DashboardMeta {
    summary: DashboardSummary;
    eventDistribution: EventDistributionItem[];
    charts: {
        revenue: ChartPoint[];
        users: ChartPoint[];
        events: ChartPoint[];
    };
}

/* ---- Revenue report (GET /dashboard/revenue-report) ---- */

export interface RevenueTopEvent {
    id: string;
    title: string;
    slug: string;
    revenue: number;
}

export interface RevenueTopHost {
    hostId: string;
    name: string;
    revenue: number;
}

export interface MonthlyRevenuePoint {
    month: string;
    revenue: number;
}

export interface RevenueReport {
    topEvents: RevenueTopEvent[];
    topHosts: RevenueTopHost[];
    monthlyRevenue: MonthlyRevenuePoint[];
}