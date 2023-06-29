// async server component

import getConversations from '../actions/getConversations'
import Sidebar from '../components/sidebar/Sidebar'
import ConversationList from './components/ConversationList'

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the conversations
  const conversations /*FullConversationType*/ = await getConversations()
  // Render the sidebar
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        {/* Render the list of conversations using the ConversationList component, defined in ConversationList.js */}
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}
