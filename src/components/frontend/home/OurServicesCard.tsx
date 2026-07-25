import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import React from "react"

type Color = "bg-chart-1" | "bg-chart-2" | "bg-chart-3" | "bg-chart-4" | "bg-chart-5"

type OurServicesCardProps = {
	title1: string
	icon: LucideIcon
	color: Color
}

export default function OurServicesCard({ color, icon, title1 }: OurServicesCardProps) {
	return (
		<>
			<Card className="aspect-square flex flex-col justify-center items-center hover:rotate-1 hover:scale-105 duration-500 ease-in-out">
				<CardContent>
					<div className="flex flex-col items-center justify-center gap-8 ">
						<div className={`${color} rounded-full p-6`}>{React.createElement(icon)}</div>
						<h6 className="capitalize text-center">{title1}</h6>
					</div>
				</CardContent>
			</Card>
		</>
	)
}
