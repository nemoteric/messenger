import { withAuth } from "next-auth/middleware";

export default withAuth({
  // The page to navigate to if the user doesn't exist
  // or has not completed the sign in process
  pages: {
    signIn: "/",
  },
});

export const config = {
  // A matcher that matches all paths starting with /users/ and stores the
  // remaining path in the path parameter
  matcher: ["/users/:path*"],
};
