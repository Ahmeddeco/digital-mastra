import AboutUs from "@/components/frontend/home/AboutUs"
import ContactUs from "@/components/frontend/home/ContactUs"
import Hero from "@/components/frontend/home/Hero"
import OurServices from "@/components/frontend/home/OurServices"
import Testimonial from "@/components/frontend/home/Testimonial"

export default async function HomePage({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	return (
		<>
			<Hero params={params} />
			<AboutUs params={params} />
			<OurServices params={params} />
			<Testimonial params={params} />
			<ContactUs params={params} />
		</>
	)
}
