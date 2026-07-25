import Dots from '@/components/shared/Dots'
import { Card, CardContent } from '@/components/ui/card'
import { getDictionary } from '@/locales/dictionaries'
import Image from 'next/image'

export default async function Testimonial({
	params,
}: {
	params: Promise<{ locale: 'en' | 'ar' }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section>
			<h4 className='text-chart-3'>{dict.homePage.testimonial.title}</h4>
			<h2 className={` capitalize`}>
				{dict.homePage.testimonial.subTitle}
			</h2>
			<div className='grid lg:grid-cols-3 grid-cols-1 gap-8 lg:gap-16 pt-4 lg:pt-12'>
				{dict.homePage.testimonial.Cards.map(
					({ clientName, clientPosition, id, image, message }) => (
						<Card
							key={id}
							className='transition-all ease-in-out duration-500 hover:scale-105 hover:rotate-1'
						>
							<CardContent>
								<div className='flex flex-col gap-6'>
									{/* -------------------------- Name & Title & Image -------------------------- */}
									<div className='flex items-center gap-4'>
										{/* ---------------------------------- Image --------------------------------- */}
										<div className='relative size-18'>
											<Image
												src={image}
												alt={'client'}
												fill
												className='object-cover rounded-full'
											/>
										</div>
										{/* ------------------------------ Name & Title ------------------------------ */}
										<div className='flex flex-col gap-0'>
											<h6 className='capitalize text-chart-3'>{clientName}</h6>
											<p className=''>{clientPosition}</p>
										</div>
									</div>
									<p>{message}</p>
								</div>
							</CardContent>
						</Card>
					)
				)}
			</div>

			{/* ---------------------------------- Dots ---------------------------------- */}
			<Dots
				color={'bg-chart-2'}
				rowNumber={4}
				className={'-rotate-6 top-0 left-4 lg:left-40 lg:block hidden'}
			/>
			<Dots
				color={'bg-chart-5'}
				rowNumber={4}
				className={'-rotate-6 bottom-0 right-4'}
			/>
		</section>
	)
}
