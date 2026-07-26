import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Map } from "lucide-react"

type Props = {
	lat: string
	lng: string
	title?: string
}

export default function MapDialog({ lat, lng, title = "show location" }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					<Map /> {title}
				</Button>
			</DialogTrigger>
			<DialogContent >
				<iframe
					width="100%"
					height="100%"
					className="border-2 rounded-lg border-primary "
					loading="lazy"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
					src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
				/>
			</DialogContent>
		</Dialog>
	)
}
