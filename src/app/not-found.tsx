import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="flex items-center justify-center gap-4 h-dvh">
			<h2>Not Found</h2>
			<h6>Could not find requested resource</h6>
			<Button asChild>
				<Link href="/">
					<Home />
					Return Home
				</Link>
			</Button>
		</div>
	)
}
