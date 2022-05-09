import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "db"

type Data = {
  log: object[]
  message: string
  error?: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (!reqSession) {
      return res.status(401).json({'message': "Permission denied", 'error': true})
  }
 
  const logs = await prisma.log.findMany(); 
  const data = {
    logs,
    message: "Log fetched successfully",
    error: false,
  }
  return res.status(200).json(data);
}
