import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { getDictionary } from "@/locales/dictionaries"

export default async function MarketingImportance({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section>
			{/* ---------------------------------- Title --------------------------------- */}
			<div className="flex flex-col gap-6 items-center justify-center">
				<h2 className={` text-center`}>
					{dict.marketingPage.marketingImportance.h2}
					<br />
					{dict.marketingPage.marketingImportance.h2Br}
				</h2>
				<h6 className="text-center max-w-5xl ">{dict.marketingPage.marketingImportance.p}</h6>
			</div>
			{/* ---------------------------------- Image --------------------------------- */}
			<div className="relative h-full aspect-video my-16 w-full lg:w-9/12 mx-auto ">
				<Image
					src="/images/marketing/growth.webp"
					alt={"marketing importance"}
					fill
					className="object-cover object-top rounded-2xl shadow-2xl drop-shadow-xl"
				/>
			</div>

			{/* -------------------------------- Accordion ------------------------------- */}
			<Accordion
				type="single"
				collapsible
				className="w-full max-w-6xl mx-auto mb-6"
				defaultValue={dict.marketingPage.marketingImportance.marketingImportanceAccordion[0].id}
			>
				{dict.marketingPage.marketingImportance.marketingImportanceAccordion.map(({ image, p, title, id }) => (
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
