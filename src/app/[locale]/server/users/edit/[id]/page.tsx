import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import EditUser from "@/forms/EditUser"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getOneUser } from "@/dl/users.data"

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])

	const id = (await params).id
	const user = await getOneUser(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit user"}
			description={"edit a user in the database."}
			btnTitle={"back"}
			href="/server/users"
		>
			{!user?.data ? <EmptyCard href={"/server/users"} linkTitle={"no user found"} /> : <EditUser user={user.data} />}
		</ServerPageCard>
	)
}
