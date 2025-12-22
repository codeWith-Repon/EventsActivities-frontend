"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"


const getDashboardMeta = async () => {

    try {
        const response = await serverFetch.get("/dashboard/meta-data")
        const result = await response.json()

        return result
    } catch (error) {
        throwError(error)
    }
}

export { getDashboardMeta }

