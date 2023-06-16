// This hook returns information about the current conversation.
// It is used in the Conversation component to determine whether
// it should be open or closed, and whether it should be displayed
// at all.

import { useParams } from "next/navigation";
import { use, useMemo } from "react";

const useConversation = () => {
  // 1. Get the conversationId from the URL
  //    using the useRouter hook from Next.js
  const params = useParams();

  // 2. Check to see if the conversationId is defined
  //    in the URL. If it's not, we can assume the
  //    conversation is not open
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  // 3. Return the conversationId and a boolean
  //    indicating if the conversation is open or not
  const isOpen = useMemo(() => {
    !!conversationId;
  }, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
