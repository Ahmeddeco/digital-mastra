import MarketingHero from "@/components/pages/marketing/MarketingHero"
import MarketingImportance from "@/components/pages/marketing/MarketingImportance"
import MarketingServices from "@/components/pages/marketing/MarketingServices"

export default async function MarketingPage({ params }: { params: Promise<{ locale: "en" | "ar" }> }) {
	return (
		<>
			<MarketingHero params={params} />
			<MarketingServices params={params} />
			<MarketingImportance params={params} />
		</>
	)
}
