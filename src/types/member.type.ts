import { getAllClientMembersForSelect, getAllMembersForPage, getOneClientMember } from "@/dl/member.data"

export type getAllMembersForPageType = Awaited<ReturnType<typeof getAllMembersForPage>>
export type getOneClientMemberType = Awaited<ReturnType<typeof getOneClientMember>>
export type getAllClientMembersForSelectType = Awaited<ReturnType<typeof getAllClientMembersForSelect>>