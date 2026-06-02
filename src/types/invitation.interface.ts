export interface IInvitation {
    id: string;
    eventId: string;
    hostId?: string;
    email: string;
    token?: string;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'REVOKED' | string;
    expiresAt: string;
    createdAt: string;
}
