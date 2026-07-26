import AboutUs from "@/components/pages/home/AboutUs"
import Hero from "@/components/pages/home/Hero"
import OurServices from "@/components/pages/home/OurServices"
import Testimonial from "@/components/pages/home/Testimonial"

export default async function HomePage({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	return (
		<>
			<Hero params={params} />
			<AboutUs params={params} />
			<OurServices params={params} />
			<Testimonial params={params} />
		</>
	)
}
