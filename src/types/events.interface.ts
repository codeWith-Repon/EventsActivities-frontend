export interface CreateEventFormData {
    title: string;
    slug: string;
    category: string;
    description: string;
    date: string;
    time: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    isFree: boolean;
    fee?: number;
    images: Array<{
        file?: File;
        preview?: string;
    }>;
    status: 'open' | 'cancelled';
}

export interface IEvent {
    id: string
    title: string
    slug: string
    category: string
    description: string
    date: string
    time: string
    location: string
    minParticipants: number
    maxParticipants: number
    totalParticipants: number
    fee: number
    images: string[]
    status: string
    createdAt: string
    updatedAt: string
    hostId: string
    host: Host
}

export interface Host {
    id: string
    userId: string
    rating: number
    totalEventsHosted: number
    createdAt: string
    updatedAt: string
    user: User
}

export interface User {
    name: string
    email: string
    role: string
    profileImage: string
    gender: string
}

