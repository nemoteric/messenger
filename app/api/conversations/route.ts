import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    // Get request body
    const body = await request.json()
    // Extract all possible properties from `body`
    const { userId, isGroup, members, name } = body

    // Check if user is logged in
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if group conversation is valid
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    // Create a group chat if isGroup is true
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        // Data to pass in using Prisma
        data: {
          name,
          isGroup,
          users: {
            // Immediately connect the current user to the group chat using Prisma
            connect: [
              // Create a connect object for each member (minus current user)
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              // Create a connect object for the current user since it is filtered out
              {
                id: currentUser.id,
              },
            ],
          },
        },
        // Populate the users when fetching the conversation using Prisma
        include: {
          users: true,
        },
      })
      return NextResponse.json(newConversation)
    }

    // Code for 1-1 conversations, check if conversation already exists
    // Use findMany() for special query that is only supported with findMany()
    const existingConversations = await prisma.conversation.findMany({
      where: {
        // Check if the conversation already exists between the current user and the other user
        // Use OR to check both ways since the current user could be the first or second user
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    })

    // If a conversation already exists, return it
    const singleConversation = existingConversations[0]

    // Check if a conversation exists and return it instead of creating a new one
    if (singleConversation) {
      return NextResponse.json(singleConversation)
    }

    // If no conversation exists (Prisma query returns an empty array), create one
    const newConversation = await prisma.conversation.create({
      // Connect the current user and the user specified by the userId argument
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
    })

    return NextResponse.json(newConversation)
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
