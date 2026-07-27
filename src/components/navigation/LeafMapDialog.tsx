// components/MapDialog.tsx
"use client"

import dynamic from "next/dynamic"
import React from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Map, Loader2 } from "lucide-react"

// استدعاء مكون الخريطة ديناميكياً لتجنب مشاكل الـ SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
			<Loader2 className="w-6 h-6 animate-spin text-primary" />
		</div>
	),
}) as React.ComponentType<{ lat: number; lng: number; popupText?: string }>

type Props = {
	lat: number | string
	lng: number | string
	title?: string
}

export default function LeafMapDialog({ lat, lng, title = "Show location" }: Props) {
	const latitude = typeof lat === "string" ? parseFloat(lat) : lat
	const longitude = typeof lng === "string" ? parseFloat(lng) : lng

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Map />
					{title}
				</Button>
			</DialogTrigger>
			<DialogContent className=" w-full h-[90vh] flex flex-col">
				<DialogTitle className="text-lg font-semibold">{title}</DialogTitle>

				<div className="w-full h-full min-h-[300px] mt-2 overflow-hidden rounded-md border border-border">
					<LeafletMap lat={latitude} lng={longitude} popupText={title} />
				</div>
			</DialogContent>
		</Dialog>
	)
}
