/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

const getAllParticipant = async (queryString: string) => {
    try {
        const response = await serverFetch.get(
            `/event-participants${queryString ? `?${queryString}` : ''}`
        );
        const result = await response.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development'
                ? error.message
                : 'Something went wrong'
                }`,
        };
    }
}

export default getAllParticipant