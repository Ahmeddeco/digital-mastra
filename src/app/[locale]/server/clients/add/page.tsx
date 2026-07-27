import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddClient from "@/forms/AddClient"
import { Role } from "@/generated/prisma/enums"

export default async function AddClientPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard
			title={"Add clients"}
			description={"Add a clients in to the database."}
			href="/server/clients"
			btnTitle={"back"}
		>
			<AddClient />
		</ServerPageCard>
	)
}
