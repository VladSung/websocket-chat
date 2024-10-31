import { IMessage } from "../../../types"
import { ListItem, ListItemProps } from "./item"

export type ListProps = {
    messages:IMessage[]
    clientId: ListItemProps['clientId']
}
export const List = ({messages, clientId}:ListProps)=>{

    return (
        <ul>
            {messages.map(message => <ListItem clientId={clientId} key={message.id} message={message}/>)}
        </ul>
    )
}