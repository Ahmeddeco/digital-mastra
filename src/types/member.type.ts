import { getAllMembersForPage, getAllMembersForSelect, getOneMember } from "@/dl/member.data"

export type getAllMembersForPageType = Awaited<ReturnType<typeof getAllMembersForPage>>
export type getOneMemberType = Awaited<ReturnType<typeof getOneMember>>
export type getAllMembersForSelectType = Awaited<ReturnType<typeof getAllMembersForSelect>>