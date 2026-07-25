import Dots from "@/components/shared/Dots"
import { Card, CardContent } from "@/components/ui/card"
import { getDictionary } from "@/locales/dictionaries"
import Image from "next/image"

export default async function Testimonial({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="relative">
			<div className="flex flex-col items-center justify-center gap-2">
				<h4>{dict.homePage.testimonial.title}</h4>
				<h2>{dict.homePage.testimonial.subTitle}</h2>
			</div>
			<div className="grid lg:grid-cols-3 grid-cols-1 gap-6 pt-4 lg:pt-12">
				{dict.homePage.testimonial.Cards.map(({ clientName, clientPosition, id, image, message }) => (
					<Card key={id} className="transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1">
						<CardContent>
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-2">
									{/* ---------------------------------- Image --------------------------------- */}
									<div className="relative size-18">
										<Image src={image} alt={"client"} fill className="object-cover rounded-full" />
									</div>
									{/* ------------------------------ Name & Title ------------------------------ */}
									<div className="flex flex-col gap-0">
										<h4>{clientName}</h4>
										<h6>{clientPosition}</h6>
									</div>
								</div>
								<h6 className="text-pretty line-clamp-2">{message}</h6>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<Dots color={"bg-chart-2"} rowNumber={4} className={"rotate-3 top-0 right-2"} />
			<Dots color={"bg-chart-1"} rowNumber={6} className={"-rotate-6 -bottom-8 left-2"} />
		</section>
	)
}
