import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"

type Props = {
	lat: string | number
	lng: string | number
	title?: string
}

export default function MapDialog({ lat, lng, title = "Show location" }: Props) {
	const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Map />
					{title}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px] w-[95vw] h-[80vh] p-4 flex flex-col">
				<DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
				<div className="w-full h-full min-h-[300px] overflow-hidden rounded-md border border-border mt-2">
					<iframe
						title={title}
						width="100%"
						height="100%"
						className="w-full h-full border-0"
						loading="lazy"
						allowFullScreen
						referrerPolicy="no-referrer-when-downgrade"
						src={mapUrl}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
