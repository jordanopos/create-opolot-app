import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Dashboard() {
  const session = await getServerSession(authOptions)
  return (
    <>
    <p>You are now signed in as {session?.user.email} with a token of {session?.access_token}</p>
    </>
  )
}

export default Dashboard