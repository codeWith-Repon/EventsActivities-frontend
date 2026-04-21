/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { changePasswordZodSchema } from '@/zod/auth.validation';

export const changePassword = async (_currentState: any, formData: FormData) => {
    const payload = {
        oldPassword: formData.get('oldPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    };

    const validatedPayload = zodValidator(payload, changePasswordZodSchema);

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
        const res = await serverFetch.post('/auth/change-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldPassword: validatedPayload.data.oldPassword,
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

        return { success: true, message: result.message || 'Password changed successfully' };
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
