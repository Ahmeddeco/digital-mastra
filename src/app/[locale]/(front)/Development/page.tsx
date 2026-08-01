import DevelopmentHero from "@/components/pages/development/DevelopmentHero"
import DevelopmentImportance from "@/components/pages/development/DevelopmentImportance"
import DevelopmentServices from "@/components/pages/development/DevelopmentServices"

export default async function DevelopmentPage({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	return (
		<>
			<DevelopmentHero params={params} />
			<DevelopmentServices params={params} />
			<DevelopmentImportance params={params} />
		</>
	)
}
