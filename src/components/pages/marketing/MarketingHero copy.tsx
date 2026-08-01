import Dots from "@/components/shared/Dots"
import StartProjectBtn from "@/components/shared/StartProjectBtn"
import { Card, CardContent } from "@/components/ui/card"
import { getDictionary } from "@/locales/dictionaries"

import { StarIcon } from "lucide-react"
import Image from "next/image"

export default async function MarketingHero({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center gap-24 lg:gap-12 min-h-[800px] h-auto relative pb-48 lg:pb-24">
			{/* ---------------------------------- Text ---------------------------------- */}
			<div className="flex flex-col gap-6 items-center">
				<h1 className={` text-center capitalize text`}>
					{dict.marketingPage.marketingHero.h1} <br /> {dict.marketingPage.marketingHero.h1Br}
				</h1>
				<h4 className="text-center max-w-xl ">
					{dict.marketingPage.marketingHero.p}
					<br />
					{dict.marketingPage.marketingHero.pBr}
				</h4>
				<StartProjectBtn params={params} />
			</div>

			{/* ---------------------------------- Image --------------------------------- */}
			<Card className=" w-full lg:w-9/12 aspect-video p-0 ">
				<CardContent className="relative w-full h-full ">
					<Image
						src={"/images/marketing/businessPlan.webp"}
						alt={"hero"}
						fill
						className="object-cover rounded-2xl shadow-2xl"
						priority
					/>
					{/* ------------------------------ Image Circles ----------------------------- */}
					<div className="size-8 lg:size-12 bg-chart-1 rounded-full absolute inset-e-4 lg:-inset-e-24 -top-6 -z-50" />
					<div className="size-8 lg:size-12 bg-chart-2 rounded-full absolute -inset-s-6 lg:-inset-s-24 -bottom-8 lg:bottom-72 -z-50" />
					{/* -------------------------------- Top Dots -------------------------------- */}
					<Dots color={"bg-chart-5"} rowNumber={4} className={" lg:block hidden -top-8 inset-e-3/4 rotate-6 "} />
					{/* ------------------------------- Bottom Dots ------------------------------ */}
					<Dots color={"bg-chart-2"} rowNumber={4} className={" lg:block hidden -bottom-10 inset-e-1/4 -rotate-6"} />
					{/* ------------------------------ Top Left Card ----------------------------- */}
					<Card className="z-40 absolute -top-12 lg:top-12 lg:-inset-s-12">
						<CardContent className="flex flex-col items-center justify-center">
							<div className="flex items-center gap-2">
								<StarIcon fill="gold" stroke="gold" />
								<p className="uppercase">{dict.marketingPage.marketingHero.TopLeftCard.title}</p>
							</div>
							<div className="flex items-center gap-2">
								<h4 className={``}>{dict.marketingPage.marketingHero.TopLeftCard.number}+</h4>
								<h6>{dict.marketingPage.marketingHero.TopLeftCard.done}</h6>
							</div>
						</CardContent>
					</Card>

					{/* ---------------------------- Bottom inset-e Card --------------------------- */}
					<Card className="z-40 absolute -bottom-48 lg:bottom-12 inset-e-2 lg:-inset-e-12 w-72">
						<CardContent className="flex flex-col gap-4 justify-center">
							<div className="flex items-center gap-2">
								{/* Image */}
								<div className="relative size-12">
									<Image src={"/images/home/client2.webp"} alt={"avatar"} fill className="rounded-full object-cover" />
								</div>
								{/* Name */}
								<div className="flex flex-col">
									<h6 className={`capitalize `}>{dict.marketingPage.marketingHero.BottomRightCard.clientName}</h6>
									<p className={`capitalize text-muted-foreground`}>
										{dict.marketingPage.marketingHero.BottomRightCard.job}
									</p>
								</div>
							</div>
							{/* Text */}
							<p className="">{dict.marketingPage.marketingHero.BottomRightCard.p}</p>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
			{/* ---------------------------- Circle Top Right ---------------------------- */}
			<div className="size-8 lg:size-12 bg-chart-5 rounded-full absolute lg:right-0 right-1 lg:top-12 top-12 -z-50" />
			{/* ----------------------------- Circle Top Left ---------------------------- */}
			<div className="size-8 lg:size-12 bg-chart-3 rounded-full absolute lg:left-0 left-6 lg:top-72 top-72 -z-50" />
		</section>
	)
}
