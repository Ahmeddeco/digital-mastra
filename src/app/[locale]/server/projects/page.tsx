import { PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import PaginationSection from "@/components/backend/Pagination"
import Settings from "@/components/backend/Settings"
import { deleteServiceAction } from "@/actions/service.action"
import { Badge } from "@/components/ui/badge"
import { getAllProjectsForPageType } from "@/types/project.type"
import { getAllProjectsForPage } from "@/dl/project.data"
import { dateFormate } from "@/logic/dateFormate"
import { connection } from "next/server"

export default async function ProjectsServerPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string; size: string }>
	params: Promise<{ locale: "en" | "ar" }>
}) {
	await connection()
	await isAllowedRoles([Role.admin])
	const locale = (await params).locale
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const projects: getAllProjectsForPageType = await getAllProjectsForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add project"
			icon={PlusCircle}
			title={"all projects"}
			description={"All projects in the database."}
			href={"/server/projects/add"}
		>
			{!projects?.data.length ? (
				<EmptyCard href={"/server/projects/add"} linkTitle={"add project"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>{locale === "en" ? "project name" : "اسم المشروع"}</TableHead>
							<TableHead>{locale === "en" ? "client name" : "اسم العميل"}</TableHead>
							<TableHead>{locale === "en" ? "services " : "الخدمة"}</TableHead>
							<TableHead>{locale === "en" ? "status" : "حالة المشروع"}</TableHead>
							<TableHead>{locale === "en" ? "startDate" : "يوم البدء"}</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{projects?.data.map(({ client, id, services, startDate, status, titleAr, titleEn }) => (
							<TableRow key={id}>
								<TableCell className="capitalize ">{locale === "en" ? titleEn : titleAr}</TableCell>
								<TableCell className="capitalize ">{client.companyName}</TableCell>
								<TableCell className="flex flex-wrap gap-2">
									{services.map((service) => (
										<Badge key={service.id}>{locale === "en" ? service.nameEn : service.nameAr}</Badge>
									))}
								</TableCell>
								<TableCell>
									<Badge variant={"outline"}>{status}</Badge>
								</TableCell>
								<TableCell className="capitalize ">{dateFormate(startDate!, locale, "monthAndYearAndDay")}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteServiceAction}
									editLink={`/server/projects/edit/${id}`}
									deleteName={"service"}
								/>
							</TableRow>
						))}
					</TableBody>

					{/* ---------------------------- Pagination ---------------------------- */}
					<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={projects.totalPages} />
				</Table>
			)}
		</ServerPageCard>
	)
}
