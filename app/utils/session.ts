import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const fetchSession = async () => {
  return await getServerSession(authOptions)
}
