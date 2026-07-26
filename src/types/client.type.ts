import { getAllClients, getOneClient } from "@/dl/clients.data"

export type getAllClientsType = Awaited<ReturnType<typeof getAllClients>>
export type getOneClientType = Awaited<ReturnType<typeof getOneClient>>