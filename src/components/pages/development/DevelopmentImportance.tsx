import Dots from '@/components/shared/Dots'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { getDictionary } from '@/locales/dictionaries'

export default async function DevelopmentImportance({
	params,
}: {
	params: Promise<{ locale: 'en' | 'ar' }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section>
			{/* ---------------------------------- Title --------------------------------- */}
			<div className='flex flex-col gap-6 items-center justify-center'>
				<h2 className={` text-center`}>
					{dict.DevelopmentPage.developmentImportance.h2}
					<br />
					{dict.DevelopmentPage.developmentImportance.h2Br}
				</h2>
				<p className='text-center max-w-5xl'>
					{dict.DevelopmentPage.developmentImportance.p}
				</p>
			</div>
			{/* ---------------------------------- Image --------------------------------- */}
			<div className='relative h-full aspect-video my-16 w-full lg:w-9/12'>
				<Image
					src='/images/development/development.webp'
					alt={'marketing importance'}
					fill
					className='object-cover object-top rounded-2xl shadow-2xl'
				/>
				<Dots
					color={'bg-chart-3'}
					rowNumber={6}
					className={'left-0 lg:left-24 -top-8 -rotate-6'}
				/>
				<Dots
					color={'bg-chart-4'}
					rowNumber={6}
					className={'right-0 lg:right-24 -bottom-8 rotate-6'}
				/>
			</div>

			{/* -------------------------------- Accordion ------------------------------- */}
			{dict.DevelopmentPage.developmentImportance.marketingImportanceAccordion.map(
				({ image, p, title, id }) => (
					<Accordion
						type='single'
						collapsible
						className='w-full max-w-5xl'
						key={id}
					>
						<AccordionItem value={id}>
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
											className={'-top-10 right-2 lg:right-12 rotate-3'}
										/>
										<Dots
											color={'bg-chart-2'}
											rowNumber={6}
											className={'-bottom-10 left-2 lg:left-24 -rotate-3'}
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
