/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { IUserInfo } from "@/types/user.interface"

interface UserInfoResponse {
    data: IUserInfo
}
export const getUserInfo = async (): Promise<UserInfoResponse | null> => {

    try {
        const response = await serverFetch.get("/users/me", {
            cache: "no-store",
        })
        const result: UserInfoResponse = await response.json()
// console.log(result)
        return result
    } catch (error: any) {
        console.log(error)
        return null
    }
}