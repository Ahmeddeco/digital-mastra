"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
	className,
	size = "default",
	dir,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
	size?: "sm" | "default"
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			dir={dir}
			className={cn(
				"peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-primary/40 transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-7 data-checked:bg-primary data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					// جعل الـ Thumb دائرياً تاماً بأبعاد متساوية (h-5 w-5 للحجم العادي) و (h-3 w-3 للحجم الصغير)
					"pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
					"group-data-[size=default]/switch:h-5 group-data-[size=default]/switch:w-5",
					"group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-3",

					// التحكم في تحريك الدائرة بشكل مثالي لللغات RTL و LTR
					"group-data-[size=default]/switch:data-checked:ltr:translate-x-5 group-data-[size=default]/switch:data-checked:rtl:-translate-x-5",
					"group-data-[size=sm]/switch:data-checked:ltr:translate-x-3 group-data-[size=sm]/switch:data-checked:rtl:-translate-x-3",
					"data-unchecked:translate-x-0",
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
