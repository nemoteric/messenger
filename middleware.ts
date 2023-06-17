// The withAuth middleware uses the session object to determine if the user has
// completed the sign in process. If the user has not completed the sign in
// process, the user will be redirected to the sign in page. The sign in page
// will redirect the user back to the page they were trying to access after they
// have completed the sign in process.

import { withAuth } from 'next-auth/middleware'

export default withAuth({
  // The page to navigate to if the user doesn't exist
  // or has not completed the sign in process
  pages: {
    signIn: '/',
  },
})

export const config = {
  // A matcher that matches all paths starting with /users/ and stores the
  // remaining path in the path parameter
  matcher: ['/users/:path*'],
}
