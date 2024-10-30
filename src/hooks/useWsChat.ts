import { useEffect, useRef, useState } from "react"
import { IMessage } from "../types"
import { MessageFactory } from "../utils/MessageFactory"

type UseWSOptions = {
    protocols?: string | string[]
    reconnectTimeout: number
}

const DEFAULT_OPTIONS = { reconnectTimeout: 5000 }

export const useWsChat = (url: string | URL, { protocols, reconnectTimeout }: UseWSOptions = DEFAULT_OPTIONS) => {
    const [ws, setWs] = useState(new WebSocket(url, protocols))
    const messageFactory = useRef(new MessageFactory())

    const [messages, setMessages] = useState<IMessage[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    const sendMessage = (message: string) => {
        ws.send(messageFactory.current.createMessage(message))
    }

    const reconnect = () => {
        ws.close()

        setWs(new WebSocket(url, protocols))
        setLoading(true)
    }

    const handleMessage = async (event: MessageEvent) => {
        const message = await (messageFactory.current.parseMessage(event.data))
        setMessages(prev => (prev ? [message, ...prev] : [message]))
    }

    let autoReconnect: NodeJS.Timeout;

    useEffect(() => {
        const handleOpen = () => {
            setLoading(false)
        }

        const handleClose = () => {
            ws.close()
            autoReconnect = setTimeout(() => {
                reconnect()
            }, reconnectTimeout);
        }

        const handleError = () => {
            autoReconnect = setTimeout(() => {
                reconnect()
            }, reconnectTimeout);
        }


        ws.addEventListener('open', handleOpen)
        ws.addEventListener('error', handleError)
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', handleClose)

        return () => {
            clearTimeout(autoReconnect)
            ws.removeEventListener('open', handleOpen)
            ws.removeEventListener('error', handleError)
            ws.removeEventListener('message', handleMessage)
            ws.removeEventListener('close', handleClose)
        }
    }, [ws])

    return { loading, messages, clientId: messageFactory.current.getClientId(), sendMessage, reconnect, close }
}