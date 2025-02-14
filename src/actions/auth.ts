"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()

        if (!clerk) {
            redirect("/auth/sign-in")
        }
        const user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                clerkId: true,
            },
        })
        if (user) {
            return {
                status: "200",
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                clerkId: user.clerkId,
            }
        }
        return {
            status: "400",
            message: "User not found",
        }
    } catch (error) {
        console.error(error)
        return {
            status: "500",
            message: "Internal server error",
        }
    }
}

export const onSignUpUser = async (data: {
    email: string
    firstname: string
    lastname: string
    clerkId: string
}) => {
    try {
        console.log(data)
        if (!data.email || !data.firstname || !data.lastname || !data.clerkId)
            return {
                status: "400",
                message: "Invalid data",
            }

        const user = await client.user.create({
            data: {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                clerkId: data.clerkId,
            },
        })

        if (user) {
            return {
                status: "200",
                message: "User created successfully",
            }
        }
        return {
            status: "400",
            message: "User not created",
        }
    } catch (error) {
        console.log(error)
        return {
            status: "500",
            message: "Internal server error",
        }
    }
}
