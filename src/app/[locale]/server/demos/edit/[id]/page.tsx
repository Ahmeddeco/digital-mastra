import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getOneDemo } from "@/dl/demo.data"
import { getAllProjectsForSelect } from "@/dl/project.data"
import EditDemo from "@/forms/EditDemo"
import { Role } from "@/generated/prisma/enums"
import { getOneDemoType } from "@/types/demo.type"
import { getAllProjectsForSelectType } from "@/types/project.type"

export default async function EditDemoPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const demo: getOneDemoType = await getOneDemo(id)
	const projects: getAllProjectsForSelectType = await getAllProjectsForSelect()

	return (
		<ServerPageCard
			title={"edit demo"}
			description={"edit a demo to the database."}
			href="/server/demos"
			btnTitle={"back"}
		>
			<EditDemo projects={projects} demo={demo} />
		</ServerPageCard>
	)
}
