import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllClientsForSelect } from "@/dl/clients.data"
import { getAllNotMemberUsersForSelect } from "@/dl/users.data"
import AddMember from "@/forms/AddMember"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForSelectType } from "@/types/client.type"
import { getAllNotMemberUsersForSelectType } from "@/types/user.type"

export default async function AddMemberPage() {
	await isAllowedRoles([Role.admin])
	const allUsers: getAllNotMemberUsersForSelectType = await getAllNotMemberUsersForSelect()
	const allClients: getAllClientsForSelectType = await getAllClientsForSelect()

	return (
		<ServerPageCard
			title={"Add member"}
			description={"Add a member to the database."}
			href="/server/clients/members"
			btnTitle={"back"}
		>
			<AddMember allUsers={allUsers} allClients={allClients} />
		</ServerPageCard>
	)
}
