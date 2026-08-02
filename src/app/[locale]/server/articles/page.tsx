import { ImageOff, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/backend/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import PaginationSection from "@/components/backend/Pagination"
import Settings from "@/components/backend/Settings"
import { Badge } from "@/components/ui/badge"
import { getAllArticlesForPageType } from "@/types/article.type"
import { getAllArticlesForPage } from "@/dl/article.data"
import { deleteArticleAction } from "@/actions/article.action"
import Image from "next/image"
import { connection } from "next/server"

export default async function ServicesServerPage({
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
	const articles: getAllArticlesForPageType = await getAllArticlesForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add article"
			icon={PlusCircle}
			title={"all articles"}
			description={"All articles in the database."}
			href={"/server/articles/add"}
		>
			{!articles?.data.length ? (
				<EmptyCard href={"/server/articles/add"} linkTitle={"add article"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>{locale === "en" ? "image" : "الصورة"}</TableHead>
							<TableHead>{locale === "en" ? "article name" : "اسم المقال"}</TableHead>
							<TableHead>{locale === "en" ? "article description" : "وصف الخدمة"}</TableHead>
							<TableHead>{locale === "en" ? "category" : "نوع الخدمة"}</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{articles?.data.map(({ category, descriptionAr, descriptionEn, id, mainImage, titleAr, titleEn }) => (
							<TableRow key={id}>
								<TableCell>
									{mainImage ? (
										<Image
											src={mainImage}
											alt={titleAr}
											width={48}
											height={48}
											className=" object-cover aspect-square rounded-lg"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{locale === "en" ? titleEn : titleAr}</TableCell>
								<TableCell>{locale === "en" ? descriptionEn : descriptionAr}</TableCell>
								<TableCell>
									<Badge>{category}</Badge>
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<Settings
									id={id}
									deleteAction={deleteArticleAction}
									editLink={`/server/articles/edit/${id}`}
									deleteName={"article"}
								/>
							</TableRow>
						))}
					</TableBody>

					{/* ---------------------------- Pagination ---------------------------- */}
					<PaginationSection pageNumber={pageNumber} pageSize={pageSize} totalPages={articles.totalPages} />
				</Table>
			)}
		</ServerPageCard>
	)
}
