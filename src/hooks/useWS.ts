import { useEffect, useRef, useState } from "react"
import { IMessage } from "../types"
import { MessageFactory } from "../utils/MessageFactory"

export const useWS = (url: string | URL, protocols?: string | string[]) => {
    const ws = useRef(new WebSocket(url, protocols))
    const messageFactory = useRef(new MessageFactory())

    const [messages, setMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    const sendMessage = (message: string) => {
        ws.current.send(messageFactory.current.createMessage(message))
    }

    const reconnect = () => {
        ws.current.close()
        ws.current = new WebSocket(url, protocols)
    }

    const handleMessage = async (event: MessageEvent) => {
        const message = await (messageFactory.current.parseMessage(event.data))
        setMessages(prev => ([...prev, message]))
    }


    useEffect(() => {
        const handleOpen = () => {
            setLoading(false)
        }

        const handleClose = () => {
            setLoading(true)
        }

        const handleError = (event: Event) => {
            console.error(event)
            setLoading(true)
        }


        ws.current.addEventListener('open', handleOpen)
        ws.current.addEventListener('error', handleError)
        ws.current.addEventListener('message', handleMessage)
        ws.current.addEventListener('close', handleClose)

        return () => {
            ws.current.removeEventListener('open', handleOpen)
            ws.current.removeEventListener('error', handleError)
            ws.current.removeEventListener('message', handleMessage)
            ws.current.removeEventListener('close', handleClose)
        }
    }, [ws])

    return { loading, messages, sendMessage, reconnect, close }
}