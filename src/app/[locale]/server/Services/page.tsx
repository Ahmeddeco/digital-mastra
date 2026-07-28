import { PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import PaginationSection from "@/components/backend/Pagination"
import Settings from "@/components/backend/Settings"
import { getAllServicesForPageType } from "@/types/service.type"
import { getAllServicesForPage } from "@/dl/service.data"
import { deleteServiceAction } from "@/actions/service.action"
import { Badge } from "@/components/ui/badge"

export default async function MembersServerPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string; size: string }>
	params: Promise<{ locale: "en" | "ar" }>
}) {
	await isAllowedRoles([Role.admin])
	const locale = (await params).locale
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const services: getAllServicesForPageType = await getAllServicesForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add service"
			icon={PlusCircle}
			title={"all services"}
			description={"All services in the database."}
			href={"/server/services/add"}
		>
			{!services?.data.length ? (
				<EmptyCard href={"/server/services/add"} linkTitle={"add service"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>{locale === "en" ? "service name" : "اسم الخدمة"}</TableHead>
							<TableHead>{locale === "en" ? "service description" : "وصف الخدمة"}</TableHead>
							<TableHead>{locale === "en" ? "category" : "نوع الخدمة"}</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{services?.data.map(({ category, descriptionAr, descriptionEn, id, nameAr, nameEn }) => (
							<TableRow key={id}>
								<TableCell className="capitalize ">{locale === "en" ? nameEn : nameAr}</TableCell>
								<TableCell>{locale === "en" ? descriptionEn : descriptionAr}</TableCell>
								<TableCell>
									<Badge>{category}</Badge>
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteServiceAction}
									editLink={`/server/services/edit/${id}`}
									deleteName={"service"}
								/>
							</TableRow>
						))}
					</TableBody>

					{/* ---------------------------- Pagination ---------------------------- */}
					<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={services.totalPages} />
				</Table>
			)}
		</ServerPageCard>
	)
}
