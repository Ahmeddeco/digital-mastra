import { getAllProjectsForPage, getAllProjectsForSelect, getOneProject } from "@/dl/project.data"

export type getAllProjectsForPageType = Awaited<ReturnType<typeof getAllProjectsForPage>>
export type getOneProjectType = Awaited<ReturnType<typeof getOneProject>>
export type getAllProjectsForSelectType = Awaited<ReturnType<typeof getAllProjectsForSelect>>