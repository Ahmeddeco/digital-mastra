import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Dots from "../../shared/Dots"
import { StarIcon } from "lucide-react"
import { getDictionary } from "@/locales/dictionaries"
import StartProjectBtn from "@/components/shared/StartProjectBtn"

export default async function Hero({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center gap-24 lg:gap-6 min-h-[80vh] h-auto relative  ">
			{/* ---------------------------------- title ---------------------------------- */}
			<div className="flex flex-col gap-6 items-center w-full">
				<h2 className={` text-center capitalize `}>
					{dict.homePage.homeHero.h1} <br /> {dict.homePage.homeHero.h1Br}
				</h2>
				<h6 className="text-center">
					{dict.homePage.homeHero.p}
					<br />
					{dict.homePage.homeHero.pBr}
				</h6>
				<StartProjectBtn params={params} />
			</div>

			{/* ---------------------------------- Image --------------------------------- */}
			<div className="relative w-full lg:w-9/12 lg:aspect-video aspect-square shadow-2xl rounded-2xl ">
				<Image
					src={dict.homePage.homeHero.image}
					alt={"hero"}
					fill
					className="object-cover rounded-2xl shadow-2xl"
					priority
				/>

				{/* ------------------------------ Image Circles ----------------------------- */}
				<div className="size-8 lg:size-12 bg-chart-1 rounded-full absolute lg:right-4 -left-4 -bottom-4 -z-50 " />
				<div className="size-8 lg:size-12 bg-chart-2 rounded-full lg:absolute hidden right-4 lg:-left-24 -bottom-8 lg:-bottom-2 -z-50" />

				{/* ------------------------------ Top Left Card ----------------------------- */}
				<Card className="z-40 absolute w-fit -top-12 lg:top-12 -left-4 lg:-left-12">
					<CardContent className="flex flex-col items-center justify-center">
						<div className="flex items-center gap-2">
							<StarIcon fill="gold" stroke="gold" />
							<h6 className="uppercase">{dict.homePage.homeHero.topLeftCard.title}</h6>
						</div>
						<div className="flex items-center gap-2">
							<h4>{dict.homePage.homeHero.topLeftCard.number}+</h4>
							<h6>{dict.homePage.homeHero.topLeftCard.done}</h6>
						</div>
					</CardContent>
				</Card>

				{/* ---------------------------- Bottom Right Card --------------------------- */}
				<Card className="z-40 absolute size-fit lg:block hidden  bottom-12 -right-12 w-72 ">
					<CardContent className="flex flex-col gap-4 justify-center">
						<div className="flex items-center gap-2">
							{/* Image */}
							<div className="relative size-14">
								<Image
									src={dict.homePage.homeHero.bottomRightCard.image}
									alt={"avatar"}
									fill
									className="rounded-full object-cover"
								/>
							</div>
							{/* Name */}
							<div className="flex flex-col gap-0">
								<h5 className={`capitalize `}>{dict.homePage.homeHero.bottomRightCard.clientName}</h5>
								<p className={`capitalize text-muted-foreground`}>{dict.homePage.homeHero.bottomRightCard.job}</p>
							</div>
						</div>
						{/* Text */}
						<p className="">{dict.homePage.homeHero.bottomRightCard.p}</p>
					</CardContent>
				</Card>
			</div>

			{/* -------------------------------- Top Dots -------------------------------- */}
			<Dots color={"bg-chart-5"} rowNumber={4} className={" lg:block hidden -top-8 right-3/4 rotate-6 "} />
			{/* ------------------------------- Bottom Dots ------------------------------ */}
			<Dots color={"bg-chart-2"} rowNumber={4} className={" lg:block hidden -bottom-10 right-1/4 -rotate-6"} />
			{/* ---------------------------- Circle Top Right ---------------------------- */}
			<div className="size-8 lg:size-12 bg-chart-5 rounded-full hidden lg:absolute lg:right-0 right-1 lg:top-12 top-12 -z-50" />
			{/* ----------------------------- Circle Top Left ---------------------------- */}
			<div className="size-8 lg:size-12 bg-chart-3 rounded-full hidden lg:absolute lg:left-0 left-6 lg:top-72 top-72 -z-50" />
		</section>
	)
}
