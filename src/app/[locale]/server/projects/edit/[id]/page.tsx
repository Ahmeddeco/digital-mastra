import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClientsForSelect } from "@/dl/clients.data"
import { getOneProject } from "@/dl/project.data"
import { getAllServicesForSelect } from "@/dl/service.data"
import EditProject from "@/forms/EditProject"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForSelectType } from "@/types/client.type"
import { getOneProjectType } from "@/types/project.type"
import { getAllServicesForSelectType } from "@/types/service.type"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const clients: getAllClientsForSelectType = await getAllClientsForSelect()
	const services: getAllServicesForSelectType = await getAllServicesForSelect()
	const project: getOneProjectType = await getOneProject(id)
	return (
		<ServerPageCard
			title={"Edit Project"}
			description={"Edit a Project in the database."}
			href="/server/projects"
			btnTitle={"back"}
		>
			<EditProject clients={clients} services={services} project={project} />
		</ServerPageCard>
	)
}
