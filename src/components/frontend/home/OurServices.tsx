import { Monitor, Tv, Settings, PenTool, ArrowRight } from "lucide-react"
import OurServicesCard from "./OurServicesCard"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/locales/dictionaries"

export default async function OurServices({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex flex-col lg:flex-row gap-8 lg:gap-16">
			{/* ---------------------------------- Text ---------------------------------- */}
			<div className="w-full lg:w-1/2 flex flex-col gap-8">
				<h4 className="text-chart-3">{dict.homePage.ourServices.title}</h4>
				<h2 className={` capitalize`}>
					{dict.homePage.ourServices.subTitle} <br />
					{dict.homePage.ourServices.subTitleBr}
				</h2>
				<p> {dict.homePage.ourServices.p1}</p>
				<p> {dict.homePage.ourServices.p2}</p>
				<Button variant={"link"} className="text-chart-3">
					Read More <ArrowRight />
				</Button>
			</div>
			{/* --------------------------------- Cards ---------------------------------- */}
			<div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 lg:gap-8">
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card1.title1}
					icon={Monitor}
					color={"bg-chart-1"}
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card2.title1}
					icon={Settings}
					color={"bg-chart-3"}
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card3.title1}
					icon={PenTool}
					color={"bg-chart-4"}
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card4.title1}
					icon={Tv}
					color={"bg-chart-2"}
				/>
			</div>
		</section>
	)
}
