import { IMessage } from "../types";

export class MessageFactory {
    private clientId: string;
    private messagesCount = 0;

    constructor() {
        this.clientId = 'id' + Math.floor(Math.random() * 360) + new Date().getDate();
    }

    getClientId() {
        return this.clientId;
    }

    createMessage(text: string) {
        return JSON.stringify({
            clientId: this.clientId,
            text,
            timestamp: new Date().toISOString(),
            id: this.clientId + ++this.messagesCount
        })
    }

    async parseMessage(message: Blob) {
        return JSON.parse(await message.text()) as IMessage
    }
}