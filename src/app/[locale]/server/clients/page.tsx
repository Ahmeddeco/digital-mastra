import { ImageOff, Link2, MoreVertical, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getAllClientsForPage } from "@/dl/clients.data"
import { getAllClientsForPageType } from "@/types/client.type"
import { Badge } from "@/components/ui/badge"
import { deleteClientAction } from "@/actions/client.action"

export default async function ClientsServerPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const clients: getAllClientsForPageType = await getAllClientsForPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add client"
			icon={PlusCircle}
			title={"all clients"}
			description={"All clients in the database."}
			href={"/server/clients/add"}
		>
			{!clients?.data.length ? (
				<EmptyCard href={"/server/clients/add"} linkTitle={"add client"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>company Name</TableHead>
							<TableHead>industry</TableHead>
							<TableHead>address</TableHead>
							<TableHead>work Tel</TableHead>
							<TableHead>website</TableHead>
							<TableHead className="text-end">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{clients.data.map(({ id, city, companyName, country, industry, state, workTel, website, logo }) => (
							<TableRow key={id}>
								<TableCell>
									{logo ? (
										<Image
											src={logo}
											alt={companyName ?? "client"}
											width={48}
											height={48}
											className="rounded-lg object-cover aspect-square"
										/>
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{companyName}</TableCell>
								<TableCell>{industry}</TableCell>
								<TableCell>
									<Badge>
										{country} - {state} - {city}{" "}
									</Badge>
								</TableCell>
								<TableCell>{workTel}</TableCell>
								<TableCell>
									<Button asChild size={"icon"} variant={"link"}>
										<Link href={website ?? ""} target="_blank">
											<Link2 />
										</Link>
									</Button>
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-end">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="space-y-2">
											<DropdownMenuItem asChild>
												<Button variant={"outline"} size={"full"} asChild>
													<Link href={`/server/clients/edit/${id}`}>edit</Link>
												</Button>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Dialog>
													<DialogTrigger asChild>
														<Button variant={"destructive"} size={"full"}>
															delete
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Are you sure you want to delete this client ?</DialogTitle>
															<DialogDescription>
																This action can not be undone. This will permanently delete this client and remove its
																data from our servers.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between mt-4">
															<Button asChild variant={"outline"}>
																<DialogClose>cancel</DialogClose>
															</Button>

															<Form action={deleteClientAction}>
																<Input type="hidden" name="id" value={id} />
																<Button variant={"destructive"} type="submit">
																	delete
																</Button>
															</Form>
														</div>
													</DialogContent>
												</Dialog>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									{/* --------------------------- Previous --------------------------- */}
									{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
								</PaginationItem>
								{/* ------------------------- PaginationLink ------------------------ */}
								{Array.from({ length: clients.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < clients.totalPages && (
										<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
