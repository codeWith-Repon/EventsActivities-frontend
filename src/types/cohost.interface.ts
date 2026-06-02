export interface ICoHost {
    id: string;
    eventId: string;
    hostId: string;
    assignedAt: string;
    host?: {
        user: { name: string; email: string; profileImage: string | null };
    };
}
