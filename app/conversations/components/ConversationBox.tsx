'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

import { FullConversationType } from '@/app/types'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from '@/app/components/Avatar'

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  // Define a handleClick callback function that will navigate to the conversation page when the conversation box is clicked
  // Use the useCallback hook to memoize the function and the router.push() method to navigate to the /conversations/${data.id} route
  // The dependencies array [data.id, router] means the handleClick function will only re-render if data.id or router changes
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  // This code uses the useMemo hook to memoize the last message in the conversation.
  // It accesses data.messages, which is an array of messages passed as a prop.
  // It gets the last message in the array and returns it. The dependencies array [data.messages] means
  // the lastMessage value will recompute if data.messages changes.
  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  // useMemo with userEmail so that it is immediately updated when session hook changes
  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    // Use || with empty array to avoid using filter on undefined
    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    // Array containing all users who have seen the sent message
    // Filter to check if the logged in user has seen the message
    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    // If none of the above, no message has been sent yet, so start a conversation
    return 'Started a conversation'
    // A dependency array in a useMemo hook lists the values that the memoized value depends on.
    // If any of those values change, the memoized value will recompute. In this code, the dependency
    // array [lastMessage] means the lastMessageText value will recompute if lastMessage changes.
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        hover:bg-neutral-100 
        rounded-lg 
        transition 
        cursor-pointer
        p-3
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
              flex
              justify-between 
              items-center 
              mb-1
            "
          >
            <p
              className="
              text-md 
              font-medium 
              text-gray-900
              "
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs
                  text-gray-400
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          {/* set text to bold or dim depending on whether message has been seen*/}
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
