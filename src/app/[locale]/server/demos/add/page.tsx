import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllProjectsForSelect } from "@/dl/project.data"
import AddDemo from "@/forms/AddDemo"
import { Role } from "@/generated/prisma/enums"
import { getAllProjectsForSelectType } from "@/types/project.type"
import { connection } from "next/server"

export default async function AddDemoPage() {
	await connection()
	await isAllowedRoles([Role.admin])
	const projects: getAllProjectsForSelectType = await getAllProjectsForSelect()

	return (
		<ServerPageCard
			title={"Add demo"}
			description={"Add a demo to the database."}
			href="/server/demos"
			btnTitle={"back"}
		>
			<AddDemo projects={projects} />
		</ServerPageCard>
	)
}
