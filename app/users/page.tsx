'use client';

import { signOut } from 'next-auth/react';

const // This code is responsible for signing the user out of the application. It is called when the user clicks the "Log Out" button in the Users component. The signOut function is defined in the auth.js module, which is imported at the top of this file. The signOut function is responsible for removing the user's session from the server and then redirecting the user to the Sign In page.

  Users = () => {
    return <button onClick={() => signOut()}>Log Out</button>;
  };

export default Users;
