import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await onAuthenticatedUser()
    if (user.status === "200") {
        redirect("/callback/sign-in")
    }
    return <div>{children}</div>
}
