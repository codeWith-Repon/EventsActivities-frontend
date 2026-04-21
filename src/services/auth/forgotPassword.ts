/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { forgotPasswordZodSchema } from '@/zod/auth.validation';

export const forgotPassword = async (_currentState: any, formData: FormData) => {
    const payload = { email: formData.get('email') };

    const validatedPayload = zodValidator(payload, forgotPasswordZodSchema);

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
        const res = await serverFetch.post('/auth/forgot-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedPayload.data),
        });

        const result = await res.json();

        return {
            success: true,
            message:
                result.message ||
                'If that email is registered you will receive a reset link shortly',
        };
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
