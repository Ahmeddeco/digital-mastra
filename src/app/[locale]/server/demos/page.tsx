import { ImageOff, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import PaginationSection from "@/components/backend/Pagination"
import Settings from "@/components/backend/Settings"
import { deleteServiceAction } from "@/actions/service.action"
import { dateFormate } from "@/logic/dateFormate"
import { getAllDemosForPageType } from "@/types/demo.type"
import { getAllDemosForPage } from "@/dl/demo.data"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default async function DemosServerPage({
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
	const demos: getAllDemosForPageType = await getAllDemosForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add demo"
			icon={PlusCircle}
			title={"all demos"}
			description={"All demos in the database."}
			href={"/server/demos/add"}
		>
			{!demos?.data.length ? (
				<EmptyCard href={"/server/demos/add"} linkTitle={"add demo"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>title</TableHead>
							<TableHead>project</TableHead>
							<TableHead>category</TableHead>
							<TableHead>created At</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{demos?.data.map(({ titleEn, id, mainImage, project, category }) => (
							<TableRow key={id}>
								<TableCell>
									{mainImage ? (
										<Image
											src={mainImage}
											alt={titleEn}
											width={48}
											height={48}
											className=" object-cover aspect-square rounded-lg"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{titleEn}</TableCell>
								<TableCell className="capitalize ">{project?.titleEn}</TableCell>
								<TableCell>
									<Badge>{category} </Badge>
								</TableCell>
								<TableCell className="capitalize ">
									{project?.createdAt && dateFormate(project.createdAt, locale, "monthAndYearAndDay")}
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteServiceAction}
									editLink={`/server/demos/edit/${id}`}
									deleteName={"service"}
								/>
							</TableRow>
						))}
					</TableBody>

					{/* ---------------------------- Pagination ---------------------------- */}
					<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={demos.totalPages} />
				</Table>
			)}
		</ServerPageCard>
	)
}
