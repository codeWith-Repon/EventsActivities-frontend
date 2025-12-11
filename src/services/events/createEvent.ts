"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

const createEvent = async (data: FormData) => {


    try {
        const res = await serverFetch.post("/events/create-event", {
            body: data
        })
        const result = await res.json()

        return result
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
};

export default createEvent
