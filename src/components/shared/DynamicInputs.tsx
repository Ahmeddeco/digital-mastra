"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { splittedItems } from "@/logic/splittedItems"
import { PlusCircle, X } from "lucide-react"
import { useState } from "react"

type Props = {
	name: string
	inputKey: string
	label: string
	errors: string[]
	id?: string
	dbData?: string[]
}

export default function DynamicInputs({ errors, inputKey, label, id, name, dbData }: Props) {
	const initialItems = dbData ? splittedItems(dbData[0]) : [""]
	const [items, setItems] = useState<string[]>(initialItems)

	const handleAddField = () => {
		setItems((prev) => [...prev, ""])
	}

	const handleRemoveField = (indexToRemove: number) => {
		if (items.length === 1) return
		setItems((prev) => prev.filter((_, index) => index !== indexToRemove))
	}

	const handleChange = (index: number, value: string) => {
		setItems((prev) => {
			const updated = [...prev]
			updated[index] = value
			return updated
		})
	}

	return (
		<Field className="space-y-4">
			<Input type="hidden" name={name} id={id} value={items} key={inputKey} />
			<FieldLabel htmlFor={label}>{label}</FieldLabel>
			{items.map((item, index) => (
				<div key={index} className="flex items-center justify-center gap-4">
					<Input type="text" value={item} onChange={(e) => handleChange(index, e.target.value)} />

					{items.length > 1 && (
						<Button type="button" size={"icon-sm"} variant={"destructive"} onClick={() => handleRemoveField(index)}>
							<X />
						</Button>
					)}
				</div>
			))}
			<Button type="button" size={"sm"} className="w-fit!" variant={"outline"} onClick={handleAddField}>
				<PlusCircle />
				add field
			</Button>
			<FieldError>{errors}</FieldError>
		</Field>
	)
}
