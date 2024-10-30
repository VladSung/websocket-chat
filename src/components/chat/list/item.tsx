import { IMessage } from "../../../types"
import classes from './style.module.css'

export type ListItemProps = {
    message:IMessage
    clientId: string
}
export const ListItem = ({message, clientId}:ListItemProps)=>{

    return (
        <li className={classes.listItem}>
            <span className={clientId === message.clientId ? classes.self : classes.other}>[{message.clientId}]: </span>
            <span>{message.text}</span>
        </li>
    )
}