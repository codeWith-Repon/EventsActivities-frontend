export interface IHostListItem {
    id: string;
    userId: string;
    rating: number;
    isVerified: boolean;
    totalEventsHosted: number;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        profileImage: string | null;
        status: string;
        createdAt: string;
    };
    _count: { events: number };
}

export interface IHostStats {
    host: {
        id: string;
        rating: number;
        isVerified: boolean;
        user: { name: string; email: string; profileImage: string | null };
    };
    stats: {
        totalEvents: number;
        totalParticipants: number;
        totalRevenue: number;
        averageRating: number;
    };
}
