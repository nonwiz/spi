import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  users?: object[],
  departments?: object[],
  locations?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = 1;
  const users = ["bdchanbroset@gmail.com", "201800157@my.apiu.edu"]
  const emails = users.map(item => ({email: item}));
  
    const department = await prisma.department.update({
      where: {
        id
      },
      data: {
        users: {
          connect: [...emails],
        }
      }
    })
     return res.status(200).json({  department })
}

// This api route is for admin to fetch the list of users, departments, and locations.
