import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllUsersForSelect } from "@/dl/users.data"
import AddClient from "@/forms/AddClient"
import { Role } from "@/generated/prisma/enums"
import { getAllUsersForSelectType } from "@/types/user.type"

export default async function AddClientPage() {
	await isAllowedRoles([Role.admin])
	const users: getAllUsersForSelectType = await getAllUsersForSelect()

	return (
		<ServerPageCard
			title={"Add clients"}
			description={"Add a clients in to the database."}
			href="/server/clients"
			btnTitle={"back"}
		>
			<AddClient users={users} />
		</ServerPageCard>
	)
}
