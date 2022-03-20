import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  location?: object,
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    if (req.method != "POST" || !reqSession || reqSession.user.email) {
        return res.status(403).json({ error: "Request forbidden" });
    }
    if (reqSession && reqSession?.user?.role == "admin") {
       return res.status(200).json({  })
    }
    res.status(500).json({error: "not authorized"})
}

// This api route is for admin to fetch the list of users, departments, and locations.