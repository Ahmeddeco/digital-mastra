import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClientsForSelect } from "@/dl/clients.data"
import { getAllServicesForSelect } from "@/dl/service.data"
import AddProject from "@/forms/AddProject"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForSelectType } from "@/types/client.type"
import { getAllServicesForSelectType } from "@/types/service.type"

export default async function AddProjectPage() {
	await isAllowedRoles([Role.admin])
	const clients: getAllClientsForSelectType = await getAllClientsForSelect()
	const services: getAllServicesForSelectType = await getAllServicesForSelect()

	return (
		<ServerPageCard
			title={"Add Project"}
			description={"Add a Project to the database."}
			href="/server/projects"
			btnTitle={"back"}
		>
			<AddProject clients={clients} services={services} />
		</ServerPageCard>
	)
}
