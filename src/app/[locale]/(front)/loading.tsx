import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
	return (
		<section className="flex flex-col items-center gap-24 lg:gap-6 min-h-[80vh] h-auto relative  ">
			{/* ---------------------------------- title ---------------------------------- */}
			<div className="flex flex-col gap-6 items-center w-full">
				<Skeleton className="h-4 w-full max-w-md" />
				<Skeleton className="h-4 w-full max-w-2xl" />
				<Skeleton className="h-10 w-48" />
			</div>

			{/* ---------------------------------- Image --------------------------------- */}
			<div className="relative w-full lg:w-9/12 lg:aspect-video aspect-square drop-shadow-xl shadow-xl rounded-2xl ">
				<Skeleton className="aspect-video" />
			</div>
		</section>
	)
}
