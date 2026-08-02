import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/backend/ServerPageCard"
import AddUser from "@/forms/AddUser"
import { Role } from "@/generated/prisma/enums"
import { connection } from "next/server"

export default async function AddUserPage() {
	await connection()
	await isAllowedRoles([Role.admin])
	return (
		<ServerPageCard
			title={"Add user"}
			description={"Add a user to the database."}
			href="/server/users"
			btnTitle={"back"}
		>
			<AddUser />
		</ServerPageCard>
	)
}
