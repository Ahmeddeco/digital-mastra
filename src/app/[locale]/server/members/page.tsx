import { ImageOff, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { Badge } from "@/components/ui/badge"
import { getAllMembersForPageType } from "@/types/member.type"
import { getAllMembersForPage } from "@/dl/member.data"
import { deleteMemberAction } from "@/actions/member.action"
import PaginationSection from "@/components/backend/Pagination"
import Settings from "@/components/backend/Settings"
import { connection } from "next/server"

export default async function MembersServerPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await connection()
	await isAllowedRoles([Role.admin])
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const members: getAllMembersForPageType = await getAllMembersForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add member"
			icon={PlusCircle}
			title={"all members"}
			description={"All members in the database."}
			href={"/server/members/add"}
		>
			{!members?.data.length ? (
				<EmptyCard href={"/server/members/add"} linkTitle={"add member"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>member name</TableHead>
							<TableHead>company Name</TableHead>
							<TableHead>position</TableHead>
							<TableHead>isPrimary</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{members?.data.map(({ client, isPrimary, position, user, id }) => (
							<TableRow key={id}>
								<TableCell>
									{user.image ? (
										<Image
											src={user.image}
											alt={user.name ?? "member"}
											width={48}
											height={48}
											className="rounded-lg object-cover aspect-square"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{user.name}</TableCell>
								<TableCell className="capitalize ">{client.companyName}</TableCell>
								<TableCell className="capitalize ">{position}</TableCell>
								<TableCell>
									<Badge variant={isPrimary ? "default" : "outline"}>{isPrimary ? "primary" : "normal"}</Badge>
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteMemberAction}
									editLink={`/server/members/edit/${id}`}
									deleteName={"member"}
								/>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={members.totalPages} />
				</Table>
			)}
		</ServerPageCard>
	)
}
