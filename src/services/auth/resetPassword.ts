/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import {
    resetPasswordTokenZodSchema,
    resetPasswordZodSchema,
} from '@/zod/auth.validation';

export const resetPassword = async (_currentState: any, formData: FormData) => {
    const payload = {
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    };

    const validatedPayload = zodValidator(payload, resetPasswordZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: 'Validation failed.',
            formData: payload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.success || !validatedPayload.data) {
        return {
            success: false,
            message: 'Validation failed.',
            formData: payload,
        };
    }

    try {
        const res = await serverFetch.post('/auth/reset-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword: validatedPayload.data.newPassword }),
        });

        const result = await res.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                formData: payload,
            };
        }

        return { success: true, message: result.message || 'Password reset successfully' };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong. Please try again.',
            formData: payload,
        };
    }
};

export const resetPasswordWithToken = async (
    _currentState: any,
    formData: FormData
) => {
    const payload = {
        token: formData.get('token'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    };

    const validatedPayload = zodValidator(payload, resetPasswordTokenZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: 'Validation failed.',
            formData: payload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.success || !validatedPayload.data) {
        return {
            success: false,
            message: 'Validation failed.',
            formData: payload,
        };
    }

    try {
        const res = await serverFetch.post('/auth/reset-password-token', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: validatedPayload.data.token,
                newPassword: validatedPayload.data.newPassword,
            }),
        });

        const result = await res.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                formData: payload,
            };
        }

        return { success: true, message: result.message || 'Password reset successfully' };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong. Please try again.',
            formData: payload,
        };
    }
};
