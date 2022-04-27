import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  user: object,
  department?: object,
  location?: object,
  error?: string,
  orderTypes?: object[]
  comment_by?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { commentId } = req.body;
  if (reqSession) {
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }
    })

    await prisma.commentBy.delete({
      where: { id: commentId }
    })

    return res.status(200).json({ 'message': "deleted comment complete" });
  }
}


