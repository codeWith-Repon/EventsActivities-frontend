/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"

export const getDashboardMeta = async (query?: Record<string, any>) => {
    try {

        const queryString = query ? new URLSearchParams(query).toString() : '';

        const url = `/dashboard/meta-data${queryString ? `?${queryString}` : ''}`;

        const response = await serverFetch.get(url);
        const result = await response.json();

        return result;
    } catch (error) {
        throwError(error)
        return null
    }
}


