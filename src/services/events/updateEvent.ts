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

        console.error('Update event error response:', result);
        return {
            success: false,
            message: result.message,
            errors: result.errors || result.data, // Capture any detailed errors
        }
    } catch (error) {
        return throwError(error)
    }
}

export default updateEvent
