'use client';

import React from "react";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { MYLO_CONSTANTS } from "@/constants";
import { useForgotPassword } from "@/hooks/authentication";
import dynamic from "next/dynamic";

const OtpInput = dynamic(
    () => import("@/components/form/otp").then((component) => component.default),
    { ssr: false }
);

const ForgotPasswordForm = () => {
    const {
        // Forgot Password
        onForgotPassword,
        registerForgotPassword,
        forgotPasswordErrors,
        isForgotPasswordPending,

        // Reset Password
        onResetPassword,
        registerResetPassword,
        resetPasswordErrors,
        isResetPasswordPending,

        // State
        isCodeSent,
        code,
        setCode,
    } = useForgotPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isCodeSent) {
            if (!code || code.length !== 6) {
                console.error("Invalid OTP code");
                return;
            }
            onResetPassword();
        } else {
            onForgotPassword();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-10"
            aria-label="Forgot password form"
        >
            {isCodeSent ? (
                // Reset Password Form
                <>
                    <div className="flex flex-col items-center gap-4 mb-5">
                        <OtpInput otp={code} setOtp={setCode} />
                        {resetPasswordErrors.code && (
                            <span className="text-red-500">{resetPasswordErrors.code.message}</span>
                        )}
                    </div>
                    {MYLO_CONSTANTS.resetPasswordForm.map((field) => (
                        <FormGenerator
                            {...field}
                            key={field.id}
                            register={registerResetPassword}
                            errors={resetPasswordErrors}
                        />
                    ))}
                </>
            ) : (
                // Forgot Password Form
                MYLO_CONSTANTS.forgotPasswordForm.map((field) => (
                    <FormGenerator
                        {...field}
                        key={field.id}
                        register={registerForgotPassword}
                        errors={forgotPasswordErrors}
                    />
                ))
            )}


            {isCodeSent ? (
                <Button
                    type="submit"
                    className="rounded-2xl"
                    disabled={isResetPasswordPending}
                    aria-label="Reset password"
                >
                    <Loader loading={isResetPasswordPending}>Reset Password</Loader>
                </Button>
            ) : (
                <Button
                    type="submit"
                    className="rounded-2xl"
                    disabled={isForgotPasswordPending}
                    aria-label="Send reset code"
                >
                    <Loader loading={isForgotPasswordPending}>Send Reset Code</Loader>
                </Button>
            )}

            {/* Debugging button to log OTP code */}
            <button
                type="button"
                onClick={() => console.log("Current OTP code:", code)}
                className="mt-2 text-sm text-blue-500"
            >
                Log OTP Code
            </button>
        </form>
    );
};

export default ForgotPasswordForm;