import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Dots from "../../shared/Dots"
import { getDictionary } from "@/locales/dictionaries"

export default async function AboutUs({
	params,
}: {
	params: Promise<{ locale: "en" | "ar" }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="">
			{/* --------------------------------- AboutUs -------------------------------- */}
			<div className="flex flex-col gap-8 items-center">
				<h4 className="text-chart-3">{dict.homePage.aboutUs.title}</h4>
				<h2 className={` capitalize`}>{dict.homePage.aboutUs.subTitle}</h2>
			</div>

			{/* ---------------------------------- Main ---------------------------------- */}
			<div className=" w-full h-auto flex lg:flex-row flex-col gap-8 lg:gap-16 lg:items-center justify-between">
				{/* ---------------------------------- Image --------------------------------- */}
				<div className="lg:w-1/2 w-full lg:min-h-96 h-auto relative aspect-square lg:aspect-video">
					<Image
						src={dict.homePage.aboutUs.image}
						alt={"about us"}
						fill
						className="aspect-square lg:aspect-video rounded-2xl shadow-2xl object-cover"
					/>
					<Dots
						color={"bg-chart-5"}
						rowNumber={4}
						className={" lg:-top-12 -top-4 left-4 lg:-left-10 -rotate-6"}
					/>
					<Dots
						color={"bg-chart-3"}
						rowNumber={4}
						className={" -bottom-4 right-4 rotate-3"}
					/>
				</div>
				{/* ---------------------------------- Text ---------------------------------- */}
				<div className="lg:w-1/2 w-full  min-h-96 h-auto flex flex-col justify-center gap-8">
					<p>{dict.homePage.aboutUs.p1}</p>
					<p>{dict.homePage.aboutUs.p2}</p>
					<Link href={dict.homePage.aboutUs.btn.href}>
						<Button>{dict.homePage.aboutUs.btn.title}</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
