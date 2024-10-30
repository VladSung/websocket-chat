import { ComponentProps } from "react"

type InputProps = ComponentProps<'input'>

export const Input = ({...props}:InputProps) => {
    return (
        <input {...props} />
    )
}