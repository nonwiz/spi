import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  users?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (reqSession && reqSession?.user?.role == "admin") {
    const { email, role } = req.body;
    const user = await prisma.user.update({
      where: {
        email
      }, data:
      {
        role
      }});
    
    return res.status(200).json({  user })
  }
  res.status(500).json({error: "not authorized"})
}


