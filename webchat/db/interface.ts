
export type Id = string

export type User = {
    id: Id
}

export type Message = {
    from: User
    to: User //
    content: String
}

export interface IHandler {
    newMessage(msg: Message): void
    getAllMessages(): Array<Message>
}
