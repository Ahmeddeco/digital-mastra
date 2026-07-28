"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllMembersForPage ---------------------------- */
export const getAllMembersForPage = async (size: number, page: number) => {
  cacheLife("hours")
  cacheTag('members')

  try {
    const totalClients = await prisma.member.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.member.findMany({
      skip: (page * size) - size,
      take: size,
      select: { id: true, position: true, isPrimary: true, client: { select: { id: true, companyName: true } }, user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: "asc" },
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneMember ------------------------------ */
export const getOneMember = async (id: string) => {
  cacheLife("hours")
  cacheTag('members')

  try {
    return await prisma.member.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllMembersForSelect ------------------------- */
export const getAllMembersForSelect = async () => {
  cacheLife("hours")
  cacheTag('members')

  try {
    return await prisma.member.findMany({
      select: { id: true, user: { select: { name: true } } },
      orderBy: { createdAt: "asc" }
    })
  } catch (error) {
    console.error(error)

  }
}