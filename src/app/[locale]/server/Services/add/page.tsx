import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import AddService from "@/forms/AddService"
import { Role } from "@/generated/prisma/enums"

export default async function AddServicePage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard
			title={"Add service"}
			description={"Add a service to the database."}
			href="/server/services"
			btnTitle={"back"}
		>
			<AddService />
		</ServerPageCard>
	)
}
