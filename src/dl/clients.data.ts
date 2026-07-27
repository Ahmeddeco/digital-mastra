"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllClients ---------------------------- */
export const getAllClientsForPage = async (size: number, page: number) => {
  cacheLife("hours")
  cacheTag('clients')

  try {
    const totalClients = await prisma.client.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.client.findMany({
      skip: (page * size) - size,
      take: size,
      select: { id: true, city: true, companyName: true, country: true, industry: true, state: true, workTel: true, website: true, logo: true },
      orderBy: { companyName: "asc" },
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
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllClientsForSelect ------------------------- */
export const getAllClientsForSelect = async () => {
  cacheLife("hours")
  cacheTag('clients')

  try {
    return await prisma.client.findMany({
      select: { id: true, companyName: true },
      orderBy: { companyName: "asc" }
    })
  } catch (error) {
    console.error(error)

  }
}