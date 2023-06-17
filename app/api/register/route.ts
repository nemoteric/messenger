import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json()
    // Get the email, name and password from the request body
    const { email, name, password } = body
    // If any of the fields are missing, return a 400 error
    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })
    // Return the user
    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
