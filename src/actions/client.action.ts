'use server'

import prisma from "@/lib/prisma"
import ClientSchema from "@/schemas/ClientSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addClientAction ----------------------------- */
export const addClientAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.client.upsert({
      where: { workTel: submission.value.workTel },
      create: {
        companyName: submission.value.companyName,
        industry: submission.value.industry,
        website: submission.value.website,
        workTel: submission.value.workTel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
      },
      update: {
        companyName: submission.value.companyName,
        industry: submission.value.industry,
        website: submission.value.website,
        workTel: submission.value.workTel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("clients")
  redirect("/server/clients")
}

/* ----------------------------- editClientAction ---------------------------- */
export const editClientAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.client.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        companyName: submission.value.companyName,
        industry: submission.value.industry,
        website: submission.value.website,
        workTel: submission.value.workTel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("clients")
  redirect("/server/clients")
}

/* ---------------------------- deleteClientAction --------------------------- */
export const deleteClientAction = async (formData: FormData) => {
  const id = formData.get("id")
  try {
    await prisma.client.update({
      where: { id: id as string },
      data: { isArchived: true, deletedAt: new Date() }
    })
  } catch (error) {
    console.error(error)
  }
  updateTag("clients")
  refresh()
}