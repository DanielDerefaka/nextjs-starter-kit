import { cn } from "@/lib/utils"
import React from "react"

export const Button: React.FC<{
    children?: React.ReactNode
    className?: string
    variant?: "simple" | "outline" | "primary"
    as?: React.ElementType
    [x: string]: any
}> = ({
    children,
    className,
    variant = "primary",
    as: Tag = "button",
    ...props
}) => {
    const variantClass =
        variant === "simple"
            ? "bg-black relative z-10 bg-transparent hover:bg-gray-100  border border-transparent text-black text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center dark:text-white dark:hover:bg-neutral-800 dark:hover:shadow-xl"
            : variant === "outline"
              ? "bg-white relative z-10 hover:bg-black/90 hover:shadow-xl  text-black border border-black hover:text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center"
              : variant === "primary"
                ? "bg-neutral-900 relative z-10 hover:bg-black/90  border border-transparent text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset]"
                : ""
    return (
        <Tag
            className={cn(
                "bg-black relative z-10 hover:bg-black/90  text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center",
                variantClass,
                className,
            )}
            // style={{
            //   boxShadow:
            //     "0px -1px 0px 0px #FFFFFF40 inset, 0px 1px 0px 0px #FFFFFF40 inset",
            // }}
            {...props}
        >
            {children ?? `Get Started`}
        </Tag>
    )
}
