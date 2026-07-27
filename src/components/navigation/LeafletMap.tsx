"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// إصلاح مشكلة اختفاء أيقونة Marker الافتراضية في Leaflet مع Next.js
const customIcon = L.icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
})

type LeafletMapProps = {
	lat: number
	lng: number
	zoom?: number
	popupText?: string
}

export default function LeafletMap({ lat, lng, zoom = 15, popupText }: LeafletMapProps) {
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={zoom}
			scrollWheelZoom={true}
			dragging={true}
			className="w-full h-full rounded-md z-0"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[lat, lng]} icon={customIcon}>
				{popupText && <Popup>{popupText}</Popup>}
			</Marker>
		</MapContainer>
	)
}
