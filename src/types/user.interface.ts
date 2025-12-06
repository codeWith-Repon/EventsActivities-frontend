export interface IUserInfo {
    id: string
    name: string
    email: string
    role: UserRole
    isHost: boolean
    gender: Gender
    dob?: Date | null
    address: string | null
    contactNumber: string | null
    bio: string | null
    profileImage: string | null
    status: string
    isDeleted: boolean
    isVerified: boolean
    createdAt: string
    updatedAt: string
    hosts: Hosts
}

export interface Hosts {
    id: string
    userId: string
    rating: number
    totalEventsHosted: number
    createdAt: string
    updatedAt: string
}

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN" | "HOST";

export type Gender = "MALE" | "FEMALE";