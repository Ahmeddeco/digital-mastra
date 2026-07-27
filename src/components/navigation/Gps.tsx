"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCurrentLocale } from "@/locales/client"
import { Field, FieldLabel } from "../ui/field"
import { RiMapPinUserLine } from "react-icons/ri"

type Coordinates = {
	lat: number
	lng: number
}

type AddressDetails = {
	country: string
	state: string
	city: string
}

type GpsProps = {
	cord?: Coordinates | null
}

async function fetchAddressFromCoords(latit: number, long: number): Promise<AddressDetails | null> {
	// التحقق من صحة الإحداثيات قبل إجراء أي طلب
	if (!latit || !long || isNaN(latit) || isNaN(long)) {
		return null
	}

	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latit}&lon=${long}&accept-language=ar`,
			{
				headers: {
					"User-Agent": "MyNextApp/1.0 (contact@example.com)",
				},
			},
		)

		if (!response.ok) {
			console.error(`Nominatim API Error: Status ${response.status}`)
			throw new Error("فشل الاتصال بخادم الخرائط")
		}

		const data = await response.json()
		const address = data.address

		if (!address) return null

		return {
			country: address.country ?? "",
			state: address.state ?? address.region ?? address.governorate ?? "",
			city: address.city ?? address.town ?? address.village ?? address.suburb ?? "",
		}
	} catch (error) {
		console.error("Reverse Geocoding Error:", error)
		return null
	}
}

type Props = {
	cord?: GpsProps
	addressDb?: AddressDetails
}

export default function Gps({ cord, addressDb }: Props) {
	const [lat, setLat] = useState<number | null>(cord?.cord?.lat ?? null)
	const [lng, setLng] = useState<number | null>(cord?.cord?.lng ?? null)
	const [address, setAddress] = useState<AddressDetails | null>(addressDb ?? null)
	const [isLoading, setIsLoading] = useState(false)
	const [isAddressLoading, setIsAddressLoading] = useState(false)
	const locale = useCurrentLocale()

	// ---------------------------------------------------------------------------
	// تحديث العنوان تلقائياً عند تغيير lat أو lng يدوياً مع Debounce
	// ---------------------------------------------------------------------------
	useEffect(() => {
		if (lat === null || lng === null || isNaN(lat) || isNaN(lng)) return

		const timer = setTimeout(async () => {
			setIsAddressLoading(true)
			const addressData = await fetchAddressFromCoords(lat, lng)
			if (addressData) {
				setAddress(addressData)
			} else {
				setAddress(null)
			}
			setIsAddressLoading(false)
		}, 800)

		return () => clearTimeout(timer)
	}, [lat, lng])

	// ---------------------------------------------------------------------------
	// جلب الموقع الحالي بالـ GPS
	// ---------------------------------------------------------------------------
	const getMyLocation = useCallback(() => {
		if (!("geolocation" in navigator)) {
			toast.error(
				locale === "en" ? "Your browser does not support location services." : "متصفحك لا يدعم خاصية تحديد الموقع",
			)
			return
		}

		setIsLoading(true)

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const currentLat = position.coords.latitude
				const currentLng = position.coords.longitude

				// تحديث الـ state
				setLat(currentLat)
				setLng(currentLng)

				try {
					// إرسال القيم المباشرة بدلاً من lat! و lng! اللتان تكونان null في البداية
					const addressData = await fetchAddressFromCoords(currentLat, currentLng)

					if (addressData) {
						setAddress(addressData)
						toast.success(
							locale === "en"
								? "Location and address successfully identified"
								: "تم تحديد الموقع واستخراج العنوان بنجاح",
						)
					} else {
						toast.warning(
							locale === "en"
								? "The coordinates were captured, but could not be translated into a written address."
								: "تم التقاط الإحداثيات، ولكن تعذر ترجمتها لعنوان مكتوب",
						)
					}
				} catch (error) {
					toast.error(
						locale === "en" ? "An error occurred while retrieving address details" : "حدث خطأ أثناء جلب تفاصيل العنوان",
					)
					console.error(error)
				} finally {
					setIsLoading(false)
				}
			},
			(err) => {
				setIsLoading(false)
				switch (err.code) {
					case err.PERMISSION_DENIED:
						toast.error(
							locale === "en"
								? "Please allow access to the site from your browser settings."
								: "يرجى السماح بالوصول للموقع من إعدادات المتصفح",
						)
						break
					case err.TIMEOUT:
						toast.error(
							locale === "en"
								? "The location request took too long, please try again."
								: "استغرق طلب الموقع وقتاً طويلاً، حاول مجدداً",
						)
						break
					default:
						toast.error(
							locale === "en" ? "An error occurred while determining the location" : "حدث خطأ أثناء تحديد الموقع",
						)
				}
			},
			options,
		)
	}, [locale])

	return (
		<Field>
			<FieldLabel>Location</FieldLabel>
			<Card>
				<CardHeader>
					<CardTitle className="text-center">
						{locale === "en" ? "Geographic location" : "تحديد الموقع الجغرافي"}
					</CardTitle>
					<CardDescription className="text-center">
						{locale === "en"
							? "Press the button or type coordinates manually to update country, governorate, and city."
							: "اضغط على الزر أو أدخل الإحداثيات يدوياً لتحديث حقول البلد والمحافظة والمدينة تلقائياً"}
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col items-center justify-center gap-6">
					{/* ------------------------------- Inputs ------------------------------- */}
					<div className="flex gap-6 w-full items-center justify-center">
						<Field>
							<FieldLabel>lat</FieldLabel>
							<Input
								name="lat"
								value={lat ?? ""}
								type="number"
								step="any"
								onChange={(e) => setLat(e.target.value === "" ? null : Number(e.target.value))}
							/>
						</Field>
						<Field>
							<FieldLabel>lng</FieldLabel>
							<Input
								name="lng"
								value={lng ?? ""}
								type="number"
								step="any"
								onChange={(e) => setLng(e.target.value === "" ? null : Number(e.target.value))}
							/>
						</Field>
						<Input name="country" value={address?.country ?? ""} type="hidden" />
						<Input name="state" value={address?.state ?? ""} type="hidden" />
						<Input name="city" value={address?.city ?? ""} type="hidden" />
					</div>

					{isAddressLoading && (
						<Button variant={"outline"}>
							<Loader2 className="animate-spin " />
							{locale === "en" ? "Address details are being retrieved." : "جاري جلب تفاصيل العنوان."}
						</Button>
					)}

					{address && !isAddressLoading && (
						<Button variant={"outline"} disabled type="button">
							{address?.country} {address?.state ? `- ${address.state}` : ""} {address?.city ? `- ${address.city}` : ""}
						</Button>
					)}

					{/* ------------------------------- Location Button ----------------------------- */}
					<Button onClick={getMyLocation} disabled={isLoading} type="button" size={"lg"}>
						{isLoading ? <Loader2 className="animate-spin" /> : <RiMapPinUserLine />}
						{isLoading
							? locale === "en"
								? "Location being determined and address being read."
								: "جاري تحديد الموقع وقراءة العنوان."
							: locale === "en"
								? "Locate me now"
								: "تحديد موقعي الآن"}
					</Button>
				</CardContent>

				{/* ----------------------- عرض الخريطة الحية للموقع ---------------------- */}
				{lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng) && (
					<CardFooter className="px-4 lg:px-6">
						<iframe
							width="100%"
							height="100%"
							className="border-2 rounded-lg border-primary md:aspect-video aspect-square"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src={`https://maps.google.com/maps?q=${lat},${lng}&z=18&output=embed`}
						/>
					</CardFooter>
				)}
			</Card>
		</Field>
	)
}
