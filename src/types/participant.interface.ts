import { IEvent } from "./events.interface"

export interface IParticipantResponse {
    id: string
    eventId: string
    hostId: string
    userId: string
    joinStatus: string
    paymentStatus: string
    createdAt: string
    updatedAt: string
    user: User
    event: IEvent
}

interface User {
    name: string
    email: string
    profileImage: string
    role: string
}


