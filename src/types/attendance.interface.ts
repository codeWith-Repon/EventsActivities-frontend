export interface IAttendanceParticipant {
    id: string;
    checkedIn: boolean;
    checkedInAt: string | null;
    user: { name: string; email: string; profileImage: string | null };
}

export interface IAttendance {
    total: number;
    attended: number;
    absent: number;
    participants: IAttendanceParticipant[];
}
