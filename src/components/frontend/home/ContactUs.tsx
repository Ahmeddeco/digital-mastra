import Dots from '@/components/shared/Dots'
import StartProjectBtn from '@/components/shared/StartProjectBtn'
import { getDictionary } from '@/locales/dictionaries'

import Image from 'next/image'

export default async function ContactUs({
	params,
}: {
	params: Promise<{ locale: 'en' | 'ar' }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<section className='lg:flex-row items-center'>
			{/* ---------------------------------- Text ---------------------------------- */}
			<div className='lg:w-1/2 w-full flex flex-col gap-8'>
				<h2 className={` capitalize`}>
					{dict.homePage.contactUs.title} <br />{' '}
					{dict.homePage.contactUs.titleBr}
				</h2>
				<p>{dict.homePage.contactUs.p}</p>
				<StartProjectBtn params={params} />
			</div>

			<div className='relative lg:w-1/2 w-full flex lg:flex-row flex-col pb-24 items-center'>
				{/* -------------------------------- Top Image ------------------------------- */}
				<div className='relative aspect-square size-72 top-24 lg:left-8 -left-8 z-30'>
					<Image
						src={'/images/home/meeting2.webp'}
						alt={'About Us'}
						fill
						className='rounded-2xl object-cover z-20'
					/>
					<Dots
						color={'bg-chart-2'}
						rowNumber={4}
						className={'-top-8 lg:-left-4 -right-8 -rotate-3'}
					/>
				</div>
				{/* ------------------------------ Bottom Image ------------------------------ */}
				<div className='relative aspect-square size-72 top-0 lg:left-8 -right-8'>
					<Image
						src={'/images/home/meeting3.webp'}
						alt={'About Us'}
						fill
						className='rounded-2xl object-cover z-20'
					/>
					<Dots
						color={'bg-chart-5'}
						rowNumber={8}
						className={'lg:-bottom-26 -bottom-16 lg:left-8 rotate-[95deg]'}
					/>
				</div>
			</div>
		</section>
	)
}
