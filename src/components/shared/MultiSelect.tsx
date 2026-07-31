"use client"

import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
	allSelectedData:
		| {
				id: string
				title: string
		  }[]
		| undefined
	defaultValues?:
		| {
				id: string
				title: string
		  }[]
		| undefined
	inputName: string
	label: string
}

export default function MultiSelect({ allSelectedData, inputName, label, defaultValues }: Props) {
	const [selected, setSelected] = useState<{ id: string; title: string }[]>(defaultValues || [])
	const selectedIds = selected?.map((item) => item.id) ?? []

	const toggle = (id: string) => {
		setSelected((prev) => {
			if (prev.some((item) => item.id === id)) {
				return prev.filter((item) => item.id !== id)
			}
			const found = allSelectedData?.find((item) => item.id === id)
			return found ? [...prev, found] : prev
		})
	}

	return (
		<Field>
			<Input type="hidden" name={inputName} value={JSON.stringify(selectedIds)} />
			<FieldLabel>{label}</FieldLabel>
			<Card className="w-full ">
				{/* -------------------------------- Badge ------------------------------- */}
				<CardContent className="flex flex-wrap gap-2">
					{selected.map(({ id, title }) => (
						<Badge
							key={id}
							onClick={() => setSelected(selected.filter((item) => item.id !== id))}
							className="cursor-pointer"
						>
							{title}
						</Badge>
					))}
				</CardContent>

				{/* ------------------------------- select ------------------------------- */}
				<CardFooter>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="default" role="combobox" size={"sm"} type="button">
								select {inputName}
								<ChevronDown opacity={0.8} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-2 " align="start">
							<Command className="w-full">
								<CommandEmpty>No result found.</CommandEmpty>
								<CommandGroup className="w-full">
									{allSelectedData?.map(({ id, title }) => (
										<CommandItem
											key={id}
											onSelect={() => toggle(id)}
											className="flex items-center gap-4 lg:w-lg w-full"
										>
											<Check className={selected.some((item) => item.id === id) ? "opacity-100" : "opacity-0"} />
											{title}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</CardFooter>
			</Card>
		</Field>
	)
}
