import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getOneService } from "@/dl/service.data"
import EditService from "@/forms/EditService"
import { Role } from "@/generated/prisma/enums"
import { getOneServiceType } from "@/types/service.type"

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const service: getOneServiceType = await getOneService(id)
	return (
		<ServerPageCard
			title={"Edit service"}
			description={"Edit a service in the database."}
			href="/server/services"
			btnTitle={"back"}
		>
			<EditService service={service} />
		</ServerPageCard>
	)
}
