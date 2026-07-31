import { getAllDemosForPage, getAllDemosForSelect, getOneDemo } from "@/dl/demo.data"

export type getAllDemosForPageType = Awaited<ReturnType<typeof getAllDemosForPage>>
export type getOneDemoType = Awaited<ReturnType<typeof getOneDemo>>
export type getAllDemosForSelectType = Awaited<ReturnType<typeof getAllDemosForSelect>>