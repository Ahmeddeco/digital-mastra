import { Monitor, Tv, Settings, PenTool, ArrowRight } from "lucide-react"
import OurServicesCard from "./OurServicesCard"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/locales/dictionaries"

export default async function OurServices({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16">
			{/* ---------------------------------- Text ---------------------------------- */}
			<div className="w-full lg:w-1/2 flex flex-col gap-6">
				<div className="flex flex-col gap-2 items-center lg:items-start">
					<h4>{dict.homePage.ourServices.title}</h4>
					<h2>{dict.homePage.ourServices.subTitle}</h2>
					<p className="max-w-lg "> {dict.homePage.ourServices.p1}</p>
					<p className="max-w-lg "> {dict.homePage.ourServices.p2}</p>
				</div>
				<Button size={"lg"}>
					<ArrowRight /> {locale === "en" ? "Read More" : "إقرأ المزيد"}
				</Button>
			</div>

			{/* --------------------------------- Cards ---------------------------------- */}
			<div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 lg:gap-6 items-center justify-center ">
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card1.title1}
					icon={Monitor}
					color={"bg-chart-1"}
					className="transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1"
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card2.title1}
					icon={Settings}
					color={"bg-chart-3"}
					className="transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1"
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card3.title1}
					icon={PenTool}
					color={"bg-chart-4"}
					className="transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1"
				/>
				<OurServicesCard
					title1={dict.homePage.ourServices.ourServicesCard.card4.title1}
					icon={Tv}
					color={"bg-chart-2"}
					className="transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1"
				/>
			</div>
		</section>
	)
}
