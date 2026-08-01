"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllUsers ---------------------------- */
export const getAllUsers = async (size: number, page: number) => {
  cacheLife("seconds")
  cacheTag('users')

  try {
    const totalColors = await prisma.user.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.user.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        name: "asc",
      },
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneUser ------------------------------ */
export const getOneUser = async (id: string) => {
  cacheLife("seconds")
  cacheTag('users')

  try {
    const data = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return { data }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllUsersForSelect ---------------------- */
export const getAllUsersForSelect = async () => {
  cacheLife("seconds")
  cacheTag('users')

  try {
    return await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------- getAllNotMemberUsersForSelect --------------------- */
export const getAllNotMemberUsersForSelect = async () => {
  cacheLife("seconds")
  cacheTag('users')

  try {
    return await prisma.user.findMany({
      where: { Members: { none: {} } },
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
  } catch (error) {
    console.error(error)
  }
}


