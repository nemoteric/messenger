// Get the current user session.

import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  // Get the current user session.
  const session = await getSession();

  // If there is no current user, return an empty array.
  if (!session?.user?.email) {
    return [];
  }

  try {
    // Get all users, sorted by their creation date.
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        // Exclude the current user from the list.
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    // If there was an error, return an empty array.
    return [];
  }
};

export default getUsers;
