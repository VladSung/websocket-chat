import { SyntheticEvent } from "react"
import { Button } from "../../shared/button"
import { Input } from "../../shared/input"

import classes from './style.module.css'

export type ChatFormProps = {
    sendMessage: (message: string) => void
}

type FormValues = {
    message: {value: string}
}

export const Form = ({sendMessage}: ChatFormProps) => {
    const onSubmit = (event:SyntheticEvent<HTMLFormElement & FormValues>) => {
        event.preventDefault()
        sendMessage(event.currentTarget.message.value)
    }

    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <Input className={classes.input} minLength={3} name="message" placeholder="type a message" />
            <Button type="submit" >Send</Button>
        </form>
    )
}