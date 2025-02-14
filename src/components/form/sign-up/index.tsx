"use client"

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/loader"
import { Button } from "@/components/ui/button"
import { MYLO_CONSTANTS } from "@/constants"
import { useAuthSignUp } from "@/hooks/authentication"
import { UserButton } from "@clerk/nextjs"
import dynamic from "next/dynamic"

const OtpInput = dynamic(
    () =>
        import("@/components/form/otp").then((component) => component.default),
    { ssr: false },
)

const SignUpForm = () => {
    const {
        register,
        errors,
        isVerifying,
        isLoading,
        isCreating,
        onGenerateCode,
        onInitiateUserRegistration,
        code,
        setCode,
        getValues,
    } = useAuthSignUp()

    const handleGenerateCode = () => {
        const email = getValues("email")
        const password = getValues("password")
        onGenerateCode(email, password)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!code || code.length !== 6) {
            console.error("Invalid OTP code")
            return
        }
        const formValues = getValues()
        onInitiateUserRegistration(formValues)
    }

    return (
        <>
            <UserButton />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 mt-10"
                aria-label="Sign up form"
            >
                {isVerifying ? (
                    <div className="flex flex-col items-center gap-4 mb-5">
                        <OtpInput otp={code} setOtp={setCode} />
                    </div>
                ) : (
                    MYLO_CONSTANTS.signUpForm.map((field) => (
                        <FormGenerator
                            {...field}
                            key={field.id}
                            register={register}
                            errors={errors}
                        />
                    ))
                )}

                {/* CAPTCHA Widget */}
                <div id="clerk-captcha" aria-label="Security verification" />

                {isVerifying ? (
                    <Button
                        type="submit"
                        className="rounded-2xl"
                        disabled={isCreating}
                        aria-label="Complete sign up"
                    >
                        <Loader loading={isCreating}>Sign Up with Email</Loader>
                    </Button>
                ) : (
                    <Button
                        type="button"
                        className="rounded-2xl"
                        onClick={handleGenerateCode}
                        disabled={isLoading}
                        aria-label="Generate verification code"
                    >
                        <Loader loading={isLoading}>Generate Code</Loader>
                    </Button>
                )}

                <button
                    type="button"
                    onClick={() => console.log("Current OTP code:", code)}
                    className="mt-2 text-sm text-blue-500"
                >
                    Log OTP Code
                </button>
            </form>
        </>
    )
}

export default SignUpForm
