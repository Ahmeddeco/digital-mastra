import { getAllServicesForPage, getAllServicesForSelect, getOneService } from "@/dl/service.data"

export type getAllServicesForPageType = Awaited<ReturnType<typeof getAllServicesForPage>>
export type getOneServiceType = Awaited<ReturnType<typeof getOneService>>
export type getAllServicesForSelectType = Awaited<ReturnType<typeof getAllServicesForSelect>>