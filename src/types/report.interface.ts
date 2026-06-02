export interface IReport {
    id: string;
    type: 'EVENT' | 'RATING' | string;
    targetId: string;
    reason: string;
    status: 'PENDING' | 'RESOLVED' | 'DISMISSED' | string;
    adminNote: string | null;
    reporter?: { name: string; email: string };
    createdAt: string;
}
