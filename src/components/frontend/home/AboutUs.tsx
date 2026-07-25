import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Dots from "../../shared/Dots"
import { getDictionary } from "@/locales/dictionaries"

export default async function AboutUs({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className=" relative flex lg:flex-row flex-col-reverse gap-6">
			{/* ---------------------------------- Image --------------------------------- */}
			<div className="lg:w-1/2 w-full lg:min-h-96 h-auto relative aspect-square lg:aspect-video">
				<Image
					src={dict.homePage.aboutUs.image}
					alt={"about us"}
					fill
					className="aspect-square lg:aspect-video rounded-2xl shadow-2xl object-cover"
				/>
			</div>

			{/* ---------------------------------- Text ---------------------------------- */}
			<div className="lg:w-1/2 w-full   h-auto flex flex-col items-center lg:items-start gap-6 ">
				<div className="flex flex-col gap-2 items-center lg:items-start">
					<h4>{dict.homePage.aboutUs.title}</h4>
					<h2>{dict.homePage.aboutUs.subTitle}</h2>
				</div>
				<h6 className="max-w-2xl ">{dict.homePage.aboutUs.p1}</h6>
				<h6 className="max-w-2xl ">{dict.homePage.aboutUs.p2}</h6>
				<Link href={dict.homePage.aboutUs.btn.href}>
					<Button>{dict.homePage.aboutUs.btn.title}</Button>
				</Link>
			</div>

			{/* --------------------------------- Dots -------------------------------- */}
			<Dots color={"bg-chart-5"} rowNumber={4} className={" lg:top-4 -top-12 lg:left-4 right-2 -rotate-6"} />
			<Dots color={"bg-chart-2"} rowNumber={4} className={" lg:bottom-8 -bottom-4 lg:right-4 -left-2 rotate-3"} />
		</section>
	)
}
