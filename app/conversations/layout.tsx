// async server component

import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const conversations /*FullConversationType*/ = await getConversations();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
