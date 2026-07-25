import Dots from '@/components/shared/Dots'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { getDictionary } from '@/locales/dictionaries'

import Image from 'next/image'

export default async function MarketingServices({
	params,
}: {
	params: Promise<{ locale: 'en' | 'ar' }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className=''>
			{/* ---------------------------------- Title --------------------------------- */}
			<div className='flex flex-col gap-6 items-center justify-center '>
				<h2 className={``}>{dict.marketingPage.marketingServices.h2}</h2>
				<p>{dict.marketingPage.marketingServices.p}</p>
			</div>

			{/* -------------------------------- Accordion ------------------------------- */}
			{dict.marketingPage.marketingServices.accordion.map(
				({ image, p, title, value }) => (
					<Accordion
						type='single'
						collapsible
						className='max-w-5xl w-full'
						key={value}
					>
						<AccordionItem value={value}>
							<AccordionTrigger>
								<h4 className='text-start'>{title}</h4>
							</AccordionTrigger>
							<AccordionContent>
								<div className='flex flex-col gap-16 lg:flex-row items-center lg:justify-between w-auto h-fit py-12'>
									{/* ---------------------------------- Image --------------------------------- */}
									<div className='relative w-full lg:w-1/2 aspect-video h-auto'>
										<Image
											src={image}
											alt={title}
											fill
											className='object-cover rounded-2xl shadow-2xl'
										/>
										<Dots
											color={'bg-chart-1'}
											rowNumber={6}
											className={'-right-10 rotate-3'}
										/>
										<Dots
											color={'bg-chart-2'}
											rowNumber={6}
											className={'-bottom-10 -rotate-3'}
										/>
									</div>

									{/* ---------------------------------- Text ---------------------------------- */}
									<div className='w-full lg:w-1/2 max-w-xl'>
										<h6 className='text-start'>{p}</h6>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				)
			)}
		</section>
	)
}
