// A user box component that displays a user
// and when clicked, creates a new conversation with that user

"use client";

// Import the Avatar component
import Avatar from "@/app/components/Avatar";
// Import the User type
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// Import the useState and useCallback hooks
import { useState, useCallback } from "react";

interface UserBoxProps {
  data: User;
}

// Creates a conversation with a particular user
// It is used when the user clicks the "message" button on a user's profile page
// The conversation is created using the API route that is defined in pages/api/conversations/index.js
// When the conversation is created, the user is redirected to the page that shows the conversation
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  // Use the router to redirect the user
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // When the user clicks on the user box, create a new conversation with that user
  const handleClick = useCallback(() => {
    // Start by setting the isLoading state to true. This will make the button disabled
    // and show a loading animation.
    setIsLoading(true);

    // Now we can send the request to the server. We're using the axios
    // library here, to send HTTP requests in JavaScript.
    axios
      .post("/api/conversations", {
        userId: data.id
      })
      // When the request finishes, the server will respond with the created conversation.
      // We can then redirect to the conversation page.
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      // Finally, set isLoading back to false so that the button is enabled again.
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      // Handle clicks on the user box
      onClick={handleClick}
      className='
        w-full
        relative
        flex
        items-center
        space-x-3
        p-3
        bg-white
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      '
    >
      <Avatar user={data} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div
            className='
              flex
              justify-between
              items-center
              mb-1
            '
          >
            <p
              className='
                text-sm
                font-medium
                text-gray-900
              '
            >
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
