import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import { getAllClientsForSelect } from "@/dl/clients.data"
import { getOneClientMember } from "@/dl/member.data"
import { getAllUsersForSelect } from "@/dl/users.data"
import EditMember from "@/forms/EditMember"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForSelectType } from "@/types/client.type"
import { getOneClientMemberType } from "@/types/member.type"
import { getAllUsersForSelectType } from "@/types/user.type"

export default async function AddMemberPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const member: getOneClientMemberType = await getOneClientMember(id)
	const allUsers: getAllUsersForSelectType = await getAllUsersForSelect()
	const allClients: getAllClientsForSelectType = await getAllClientsForSelect()

	return (
		<ServerPageCard
			title={"Edit member"}
			description={"Edit a member to the database."}
			href="/server/members"
			btnTitle={"back"}
		>
			<EditMember allUsers={allUsers} allClients={allClients} member={member} />
		</ServerPageCard>
	)
}
