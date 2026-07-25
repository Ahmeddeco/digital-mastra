import Dots from "@/components/shared/Dots"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getDictionary } from "@/locales/dictionaries"
import Image from "next/image"
import Link from "next/link"

export default async function OurPortfolio({
	params,
}: {
	params: Promise<{ locale: "en" | "ar" }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="">
			<h4 className="text-chart-3">{dict.homePage.ourPrtfolioCard.title}</h4>
			<h2 className={` capitalize`}>
				{dict.homePage.ourPrtfolioCard.subTitle}
			</h2>
			<div className="max-w-3xl">
				<p className="text-center">{dict.homePage.ourPrtfolioCard.p}</p>
			</div>

			{/* ---------------------------------- Dots ---------------------------------- */}
			<Dots
				color={"bg-chart-2"}
				rowNumber={4}
				className={" lg:top-44 -top-16 rotate-6 lg:right-44 right-6"}
			/>
			<Dots
				color={"bg-chart-3"}
				rowNumber={4}
				className={" lg:top-72 -rotate-3 lg:left-44 -bottom-6 left-4"}
			/>

			{/* ---------------------------------- Cards --------------------------------- */}
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 pt-4 lg:pt-12">
				{dict.homePage.ourPrtfolioCard.cards.map(
					({ href, id, image, title }) => (
						<Card
							className="p-0 pb-4 hover:scale-105 hover:rotate-1 ease-in-out duration-700 cursor-pointer max-w-md"
							key={id}
						>
							<CardContent className="px-0">
								<Link href={href}>
									<div className="w-full h-96 aspect-square relative border-b shadow-md">
										<Image
											src={image}
											alt={"Our Portfolio"}
											fill
											className="rounded-t-2xl object-cover "
										/>
									</div>
								</Link>
							</CardContent>
							<CardFooter>
								<h4 className={` capitalize`}>{title}</h4>
							</CardFooter>
						</Card>
					)
				)}
			</div>
		</section>
	)
}
