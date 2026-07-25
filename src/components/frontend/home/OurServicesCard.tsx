import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import React from "react"

type Color = "bg-chart-1" | "bg-chart-2" | "bg-chart-3" | "bg-chart-4" | "bg-chart-5"

type OurServicesCardProps = {
	title1: string
	icon: LucideIcon
	color: Color
	className?: string
}

export default function OurServicesCard({ color, icon, title1, className }: OurServicesCardProps) {
	return (
		<>
			<Card className={`${className} lg:aspect-video aspect-square flex flex-col justify-center items-center `}>
				<CardContent>
					<div className="flex flex-col items-center justify-center gap-6 ">
						<div className={`${color} rounded-full p-6`}>{React.createElement(icon)}</div>
						<h6 className="capitalize text-center">{title1}</h6>
					</div>
				</CardContent>
			</Card>
		</>
	)
}
