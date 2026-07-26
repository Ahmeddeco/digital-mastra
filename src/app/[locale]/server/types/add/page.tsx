import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddProjectType from "@/forms/AddProjectType"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard
			title={"Add project type"}
			description={"Add a project type to the database."}
			href="/server/types"
			btnTitle={"back"}
		>
			<AddProjectType />
		</ServerPageCard>
	)
}
