export interface IEventAnalytics {
    views: number;
    participants: {
        total: number;
        approved: number;
        pending: number;
        rejected: number;
        cancelled: number;
        waitlisted: number;
    };
    capacity: { max: number; filled: number; fillRate: number };
    revenue: { collected: number; pending: number; refunded: number };
    checkin: { checkedIn: number; absent: number; attendanceRate: number };
}
