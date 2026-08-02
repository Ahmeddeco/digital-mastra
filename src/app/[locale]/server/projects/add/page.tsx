import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClientsForSelect } from "@/dl/clients.data"
import { getAllServicesForSelect } from "@/dl/service.data"
import AddProject from "@/forms/AddProject"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForSelectType } from "@/types/client.type"
import { getAllServicesForSelectType } from "@/types/service.type"
import { connection } from "next/server"

export default async function AddProjectPage() {
	await connection()
	const clients: getAllClientsForSelectType = await getAllClientsForSelect()
	await isAllowedRoles([Role.admin])
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
