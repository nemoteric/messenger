import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

// This is a hook that returns an array of routes
// based on the current pathname and conversationId
// The hook is used in the Sidebar component
// to determine which routes should be active
const useRoutes = () => {
  // Get the current pathname from navigation
  // `pathname` holds the current path of the URL in the browser
  const pathname = usePathname();

  // Get the current conversationId from the Conversation context
  const { conversationId } = useConversation();

  // Create an array of routes, using React's useMemo
  // and return an array of route objects
  // Create a memoized routes array for the sidebar navigation
  const routes = useMemo(
    () => [
      // Add a route for the Chat page
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId
      },
      // Add a route for the Users page
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users"
      },
      // Add a route for logging out
      {
        label: "Log out",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle
      }
    ],
    // Add all variables used in the hook's callback to the dependency array
    [pathname, conversationId]
  );

  // Return the routes array
  return routes;
};

export default useRoutes;
