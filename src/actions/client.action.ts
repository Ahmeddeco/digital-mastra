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


  console.log('submission from addClientAction', submission)

  try {
    await prisma.client.upsert({
      where: { tel: submission.value.tel! },
      create: {
        companyName: submission.value.companyName,
        tel: submission.value.tel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        userId: submission.value.userId,
        lat: Number(submission.value.lat),
        lng: Number(submission.value.lng),
      },
      update: {
        companyName: submission.value.companyName,
        tel: submission.value.tel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        userId: submission.value.userId,
        lat: Number(submission.value.lat),
        lng: Number(submission.value.lng),
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
        tel: submission.value.tel,
        secondaryTel: submission.value.secondaryTel,
        logo: submission.value.logo,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        userId: submission.value.userId,
        lat: Number(submission.value.lat),
        lng: Number(submission.value.lng),
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
    await prisma.client.delete({
      where: {
        id: id as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  updateTag("clients")
  refresh()
}