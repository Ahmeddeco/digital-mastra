"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllClients ---------------------------- */
export const getAllMembersForPage = async (size: number, page: number) => {
  cacheLife("hours")
  cacheTag('members')

  try {
    const totalClients = await prisma.clientMember.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.clientMember.findMany({
      skip: (page * size) - size,
      take: size,
      select: { position: true, isPrimary: true, client: { select: { id: true, companyName: true } }, user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "asc" },
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneClientMember ------------------------------ */
export const getOneClientMember = async (id: string) => {
  cacheLife("hours")
  cacheTag('members')

  try {
    return await prisma.clientMember.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllClientMembersForSelect ------------------------- */
export const getAllClientMembersForSelect = async () => {
  cacheLife("hours")
  cacheTag('members')

  try {
    return await prisma.clientMember.findMany({
      select: { id: true, user: { select: { name: true } } },
      orderBy: { createdAt: "asc" }
    })
  } catch (error) {
    console.error(error)

  }
}