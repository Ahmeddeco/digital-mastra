import { getAllClientsForPage, getAllClientsForSelect, getOneClient } from "@/dl/clients.data"

export type getAllClientsForPageType = Awaited<ReturnType<typeof getAllClientsForPage>>
export type getOneClientType = Awaited<ReturnType<typeof getOneClient>>
export type getAllClientsForSelectType = Awaited<ReturnType<typeof getAllClientsForSelect>>