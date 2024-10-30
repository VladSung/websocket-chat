import { ChatForm, ChatFormProps } from "./form"
import { ChatList, ChatListProps } from "./list"

type ChatProps = {
    messages:ChatListProps['messages'] | null,
    clientId: ChatListProps['clientId'],
    sendMessage: ChatFormProps['sendMessage'],
    loading: boolean
}
export const Chat = ({messages, clientId, loading, sendMessage}:ChatProps) => {

    if(loading) return (<div>Loading...</div>)

    return (
        <div>
        <ChatForm sendMessage={sendMessage} />
        {messages?.length ? <ChatList clientId={clientId} messages={messages} /> : <div>No messages yet.</div>}
        </div>
    )
}