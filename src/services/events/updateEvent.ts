"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"
import { revalidatePath } from "next/cache"

const updateEvent = async (slug: string, data: FormData) => {
    try {
        const response = await serverFetch.patch(`/events/update/${slug}`, { body: data })
        const result = await response.json()

        if (response.ok) {
            revalidatePath('/my-events')
            return { success: true, data: result }
        }

        return { success: false, message: result.message }
    } catch (error) {
        return throwError(error)
    }
}

export default updateEvent
