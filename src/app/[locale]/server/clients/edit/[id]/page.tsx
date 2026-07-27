import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import EditClient from "@/forms/EditClient"
import { getOneClient } from "@/dl/clients.data"
import { getOneClientType } from "@/types/client.type"

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])
	const id = (await params).id
	const client: getOneClientType = await getOneClient(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit client"}
			description={"edit a client in the database."}
			btnTitle={"back"}
			href="/server/clients"
		>
			{!client ? <EmptyCard href={"/server/clients"} linkTitle={"no client found"} /> : <EditClient client={client} />}
		</ServerPageCard>
	)
}
