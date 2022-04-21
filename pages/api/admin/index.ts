import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  users?: object[],
  departments?: object[],
  locations?: object[],
  roles?: string[],
  zones: string[],
  error?: string,
  orderTypes?: object[],
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("test", Role);
  const reqSession = await getSession({req});
  if (reqSession && reqSession?.user?.role == "admin") {
    const users = await prisma.user.findMany({
      include: {
        department: true,
        location: true
      }
    });
    const departments = await prisma.department.findMany({include: {users: true}});
    const locations = await prisma.location.findMany();
    const orderTypes = await prisma.orderType.findMany();
    return res.status(200).json({  users, departments, locations, roles: Object.keys(Role), zones: Object.keys(Zone), orderTypes })
  }
  res.status(500).json({error: "not authorized"})
}

// This api route is for admin to fetch the list of users, departments, and locations.
