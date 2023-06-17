// Import the Conversation, Message and User models from the Prisma schema
import { Conversation, Message, User } from '@prisma/client'

// Define a new type for a message that includes the sender and seen array
export type FullMessageType = Message & {
  sender: User
  seen: User[]
}

// Define a new type for a conversation that includes the users and messages
export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}
