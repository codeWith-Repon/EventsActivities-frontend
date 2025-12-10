/* eslint-disable @typescript-eslint/no-explicit-any */

export const throwError = (error: any, message?: string) => {
    return {
        success: false,
        message: `${process.env.NODE_ENV === 'development' ? error.message : message || 'Something went wrong'}`,
    }
}