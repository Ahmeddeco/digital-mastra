import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/locales/dictionaries"
import { TbUserQuestion } from "react-icons/tb"

export default async function AboutUs({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className=" relative flex lg:flex-row flex-col gap-6">
			{/* ---------------------------------- Text ---------------------------------- */}
			<div className="lg:w-1/2 w-full   h-auto flex flex-col items-center lg:items-start gap-6 ">
				<div className="flex flex-col gap-2 items-center lg:items-start">
					<h4>{dict.homePage.aboutUs.title}</h4>
					<h2>{dict.homePage.aboutUs.subTitle}</h2>
				</div>
				<p className="max-w-lg ">{dict.homePage.aboutUs.p1}</p>
				<p className="max-w-lg ">{dict.homePage.aboutUs.p2}</p>
				<Button asChild size={"lg"}>
					<Link href={dict.homePage.aboutUs.btn.href}>
						<TbUserQuestion />
						{dict.homePage.aboutUs.btn.title}
					</Link>
				</Button>
			</div>

			{/* ---------------------------------- Image --------------------------------- */}
			<div className="lg:w-1/2 w-full lg:min-h-96 h-auto relative aspect-square lg:aspect-video rounded-2xl drop-shadow-xl shadow-xl">
				<Image
					src={dict.homePage.aboutUs.image}
					alt={"about us"}
					fill
					className="aspect-square lg:aspect-video rounded-2xl  object-cover"
				/>
			</div>
		</section>
	)
}
