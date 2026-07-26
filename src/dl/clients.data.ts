"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllClients ---------------------------- */
export const getAllClients = async (size: number, page: number) => {
  cacheLife("hours")
  cacheTag('clients')

  try {
    const totalClients = await prisma.client.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.client.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        companyName: "asc",
      },
      include: { owner: { select: { id: true, name: true } } }
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneClient ------------------------------ */
export const getOneClient = async (id: string) => {
  cacheLife("hours")
  cacheTag('clients')

  try {
    return await prisma.client.findUnique({
      where: { id },
      include: { owner: { select: { id: true, name: true } } }
    })
  } catch (error) {
    console.error(error)
  }
}
