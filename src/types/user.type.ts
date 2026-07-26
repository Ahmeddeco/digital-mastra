import { getAllClients } from "@/dl/clients.data"
import { getAllUsers, getAllUsersForSelect, getOneUser } from "@/dl/users.data"

export type getAllClientsType = Awaited<ReturnType<typeof getAllClients>>
export type getAllUsersType = Awaited<ReturnType<typeof getAllUsers>>
export type getOneUserType = Awaited<ReturnType<typeof getOneUser>>
export type getAllUsersForSelectType = Awaited<ReturnType<typeof getAllUsersForSelect>>