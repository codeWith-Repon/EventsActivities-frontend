/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { throwError } from "@/lib/throwError";

const getAllParticipant = async (queryString?: string) => {
    try {
        const response = await serverFetch.get(
            `/event-participants${queryString ? `?${queryString}` : ''}`
        );
        const result = await response.json();

        return result;
    } catch (error: any) {
        throwError(error)
    }
}

export default getAllParticipant