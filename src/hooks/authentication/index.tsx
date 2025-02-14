import { onSignUpUser } from "@/actions/auth"
import { SignUpSchema } from "@/app/auth/sign-up/schema"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { signInSchema } from "./schema"

// interface RegistrationValues {
//     email: string;
//     firstname: string;
//     lastname: string;
// }

export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
    })

    const router = useRouter()

    const onClerkAuth = async (email: string, password: string) => {
        if (!isLoaded)
            return toast("Error", {
                description: "Something went wrong",
                duration: 3000,
                icon: "🚨",
            })

        try {
            const authentication = await signIn.create({
                identifier: email,
                password: password,
            })

            if (authentication.status === "complete") {
                setActive({ session: authentication.createdSessionId })
                toast("Success", {
                    description: "You are now signed in",
                    duration: 3000,
                    icon: "🔑",
                })
                router.push("/callback/sign-in")
            }
        } catch (error: any) {
            if (error instanceof Error) {
                toast("Error", {
                    description: error.message,
                    duration: 3000,
                    icon: "🚨",
                })
            }

            if (error.errorCode === "invalid_credentials") {
                toast("Error", {
                    description: "Invalid credentials",
                    duration: 3000,
                    icon: "🚨",
                })
            }

            if (error.errorCode === "form_password_invalid") {
                toast("Error", {
                    description: "Invalid password",
                    duration: 3000,
                    icon: "🚨",
                })
            }
        }
    }

    const { mutate: InitiateLoginFlow, isPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => {
            return onClerkAuth(email, password)
        },
    })

    const onAuthenticateUser = handleSubmit((values) => {
        InitiateLoginFlow({ email: values.email, password: values.password })
    })

    return {
        onAuthenticateUser,
        isPending,
        register,
        errors,
    }
}

export const useAuthSignUp = () => {
    const { isLoaded, setActive, signUp } = useSignUp()
    const [isVerifying, setIsVerifying] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [code, setCode] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        mode: "onBlur",
    })

    const router = useRouter()

    const onGenerateCode = async (email: string, password: string) => {
        console.log(email, password)
        if (!isLoaded)
            return toast("Error", {
                description: "Something went wrong check network connection",
                duration: 3000,
                icon: "🚨",
            })

        try {
            if (email && password) {
                await signUp.create({
                    emailAddress: getValues("email"),
                    password: getValues("password"),
                })

                await signUp.prepareVerification({ strategy: "email_code" })
                setIsVerifying(true)
            } else {
                toast("Error", {
                    description: "Invalid email or password! Try Again",
                    duration: 3000,
                    icon: "🚨",
                })
                setIsLoading(false)
                setIsCreating(false)
                setIsVerifying(false)
            }
        } catch (error) {
            console.log(error)
            toast("Error", {
                description: "Something went wrong here",
                duration: 3000,
                icon: "🚨",
            })
        }
    }

    const onInitiateUserRegistration = async (values) => {
        console.log("Form values received:", values) // Add this line

        if (!isLoaded) {
            return showErrorToast(
                "Something went wrong. Please check your network connection",
            )
        }

        // Add logging to verify code
        console.log("Received OTP code:", code)

        if (!code || code.length !== 6) {
            console.error("Invalid OTP code format")
            return showErrorToast(
                "Please enter a valid 6-digit verification code",
            )
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                { code },
            )

            if (completeSignUp.status !== "complete") {
                console.error(
                    "Verification failed with status:",
                    completeSignUp.status,
                )
                return showErrorToast("Invalid verification code")
            }

            if (completeSignUp.status === "complete") {
                if (!signUp.createdUserId) {
                    console.error("No created user ID found")
                    return
                }

                const user = await onSignUpUser({
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    clerkId: signUp.createdUserId,
                })
                console.log(user)

                if (user.status === "200") {
                    console.log("User successfully created:", user)
                    showSuccessToast("You are now signed up")
                    await setActive({
                        session: completeSignUp.createdSessionId,
                    })
                    router.push("/dashboard")
                } else {
                    console.error("User creation failed:", user)
                    showErrorToast(user.message || "Failed to create user")
                }
            }
        } catch (error) {
            console.error("Signup error:", error)
            showErrorToast("An unexpected error occurred during signup")
        }
    }

    // Helper functions
    const showErrorToast = (message: string) => {
        toast("Error", {
            description: message,
            duration: 3000,
            icon: "🚨",
        })
    }

    const showSuccessToast = (message: string) => {
        toast("Success", {
            description: message,
            duration: 3000,
            icon: "🔑",
        })
    }

    return {
        onInitiateUserRegistration,
        isVerifying,
        isCreating,
        isLoading,
        onGenerateCode,
        setCode,
        code,
        getValues,
        errors,
        register,
    }
}
