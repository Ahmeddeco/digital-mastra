import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getDictionary } from "@/locales/dictionaries"
import Image from "next/image"

export default async function DevelopmentServices({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex-col flex items-center justify-center gap-6">
			{/* ---------------------------------- Title --------------------------------- */}
			<h2 className="text-center">{dict.DevelopmentPage.developmentServices.h2}</h2>
			<h5 className="text-center max-w-2xl">{dict.DevelopmentPage.developmentServices.p}</h5>
			{/* -------------------------------- Accordion ------------------------------- */}
			<Accordion type="single" collapsible defaultValue="web" className=" w-full max-w-6xl mx-auto mb-6">
				{dict.DevelopmentPage.developmentServices.accordion.map(({ image, p, title, value }) => (
					<AccordionItem value={value} key={value}>
						<AccordionTrigger>
							<h3>{title}</h3>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-6 lg:flex-row items-center lg:justify-between w-auto h-fit py-2">
								{/* ---------------------------------- Image --------------------------------- */}
								<div className="relative size-full lg:max-w-2/3 aspect-video rounded-2xl overflow-hidden shadow-2xl">
									<Image src={image} alt={title} fill className="object-cover rounded-2xl shadow-2xl" />
								</div>
								{/* ---------------------------------- Text ---------------------------------- */}
								<div className="w-full lg:w-1/3 max-w-xl ">
									<h6 className="text-start">{p}</h6>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
