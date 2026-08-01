import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { getDictionary } from "@/locales/dictionaries"

export default async function DevelopmentImportance({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className="flex-col flex items-center justify-center gap-6">
			{/* ---------------------------------- Title --------------------------------- */}
			<div className="flex flex-col gap-6 items-center justify-center">
				<h2 className={` text-center`}>
					{dict.DevelopmentPage.developmentImportance.h2}
					<br />
					{dict.DevelopmentPage.developmentImportance.h2Br}
				</h2>
				<h5 className="text-center max-w-2xl">{dict.DevelopmentPage.developmentImportance.p}</h5>
			</div>

			{/* -------------------------------- Accordion ------------------------------- */}
			<Accordion
				type="single"
				collapsible
				defaultValue={dict.DevelopmentPage.developmentImportance.marketingImportanceAccordion[0].id}
				className=" w-full max-w-6xl mx-auto mb-6"
			>
				{dict.DevelopmentPage.developmentImportance.marketingImportanceAccordion.map(({ image, p, title, id }) => (
					<AccordionItem value={id} key={id}>
						<AccordionTrigger>
							<h4 className="text-start">{title}</h4>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-6 lg:flex-row items-center lg:justify-between w-auto h-fit py-12">
								{/* ---------------------------------- Image --------------------------------- */}
								<div className="relative w-full lg:w-2/3 aspect-video h-auto">
									<Image src={image} alt={title} fill className="object-cover rounded-2xl shadow-2xl" />
								</div>

								{/* ---------------------------------- Text ---------------------------------- */}
								<div className="w-full lg:w-1/3 max-w-xl">
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
