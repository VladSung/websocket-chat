import { ComponentProps } from "react"

type ButtonProps = ComponentProps<'button'>

export const Button = ({children, ...props}:ButtonProps) => {
    return (
        <button {...props}>
            {children}
        </button>
    )
}