import { getAllNotMemberUsersForSelect, getAllUsers, getAllUsersForSelect, getOneUser } from "@/dl/users.data"

export type getAllUsersType = Awaited<ReturnType<typeof getAllUsers>>
export type getOneUserType = Awaited<ReturnType<typeof getOneUser>>
export type getAllUsersForSelectType = Awaited<ReturnType<typeof getAllUsersForSelect>>
export type getAllNotMemberUsersForSelectType = Awaited<ReturnType<typeof getAllNotMemberUsersForSelect>>