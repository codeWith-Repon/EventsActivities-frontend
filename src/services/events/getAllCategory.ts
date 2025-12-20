import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"


const getAllCategory = async () => {
    try {
        const response = await serverFetch.get('/events/category')
        const result = await response.json()
        return result
    } catch (error) {
        throwError(error)
    }
}

export default getAllCategory