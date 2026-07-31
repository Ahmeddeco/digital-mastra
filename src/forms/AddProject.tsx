"use client"

import { useState, useActionState } from "react"
import { useForm, getFormProps } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { addProjectAction } from "@/actions/project.action"
import ProjectSchema from "@/schemas/ProjectSchema"
import { getAllClientsForSelectType } from "@/types/client.type"
import DatePicker from "@/components/shared/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import ProjectStatusSchema from "@/generated/zod/inputTypeSchemas/ProjectStatusSchema"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllServicesForSelectType } from "@/types/service.type"
import MultiSelect from "@/components/shared/MultiSelect"
import Form from "next/form"
import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"

type Props = {
	clients: getAllClientsForSelectType
	services: getAllServicesForSelectType
}

export default function AddProject({ clients, services }: Props) {
	const [lastResult, action] = useActionState(addProjectAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProjectSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const formattedServices = services?.map((service) => ({ id: service.id, title: service.nameEn }))

	// إدارة حالة الـ Metadata محلياً لضمان سرعة الاستجابة وعدم الاعتماد على الـ Form Intent
	const [metadataFields, setMetadataFields] = useState<{ id: number; key: string; value: string }[]>([])

	const addMetadataRow = () => {
		setMetadataFields((prev) => [...prev, { id: Date.now(), key: "", value: "" }])
	}

	const removeMetadataRow = (id: number) => {
		setMetadataFields((prev) => prev.filter((item) => item.id !== id))
	}

	return (
		<Form {...getFormProps(form)} action={action} className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* --------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.id}>{fields.titleAr.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleAr.key}
						name={fields.titleAr.name}
						defaultValue={fields.titleAr.initialValue}
					/>
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* --------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.id}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={fields.titleEn.initialValue}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>

				{/* ------------------------------ descriptionAr ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionAr.id}>{fields.descriptionAr.name}</FieldLabel>
					<Textarea
						name={fields.descriptionAr.name}
						defaultValue={fields.descriptionAr.initialValue}
						key={fields.descriptionAr.key}
					/>
					<FieldError>{fields.descriptionAr.errors}</FieldError>
				</Field>

				{/* ------------------------------ descriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionEn.id}>{fields.descriptionEn.name}</FieldLabel>
					<Textarea
						name={fields.descriptionEn.name}
						defaultValue={fields.descriptionEn.initialValue}
						key={fields.descriptionEn.key}
					/>
					<FieldError>{fields.descriptionEn.errors}</FieldError>
				</Field>

				{/* -------------------------------- clientId -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.clientId.id}>client</FieldLabel>
					<Select key={fields.clientId.key} name={fields.clientId.name} defaultValue={fields.clientId.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{clients?.map(({ companyName, id }) => (
								<SelectItem value={id} key={id}>
									{companyName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.clientId.errors}</FieldError>
				</Field>

				{/* -------------------------------- status -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.status.id}>status</FieldLabel>
					<Select key={fields.status.key} name={fields.status.name} defaultValue={fields.status.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(ProjectStatusSchema.Enum).map((status) => (
								<SelectItem value={status} key={status}>
									{status}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.status.errors}</FieldError>
				</Field>

				{/* ------------------------------ category ------------------------------ */}
				<Field>
					<FieldLabel htmlFor={fields.category.id}>category</FieldLabel>
					<Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(ProjectCategorySchema.Enum).map((category) => (
								<SelectItem value={category} key={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.category.errors}</FieldError>
				</Field>

				{/* -------------------------------- startDate ------------------------------- */}
				<DatePicker
					label={"start Date"}
					key={fields.startDate.key}
					name={fields.startDate.name}
					defaultValue={fields.startDate.initialValue}
					errors={fields.startDate.errors}
				/>

				{/* -------------------------------- endDate ------------------------------- */}
				<DatePicker
					label={"end Date"}
					key={fields.endDate.key}
					name={fields.endDate.name}
					defaultValue={fields.endDate.initialValue}
					errors={fields.endDate.errors}
				/>
			</div>

			{/* -------------------------------- services -------------------------------- */}
			<MultiSelect allSelectedData={formattedServices} inputName={fields.services.name} label={"services"} />

			{/* ------------------------------ Dynamic Metadata Section ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.status.id}>Metadata</FieldLabel>
				<Card className="p-4 border rounded-lg space-y-4 bg-muted/20">
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Project Custom Metadata</CardTitle>
						<Button variant={"outline"} type="button" size="sm" onClick={addMetadataRow}>
							<Plus className="w-4 h-4 mr-1" /> Add Field
						</Button>
					</CardHeader>
					<CardContent className="space-y-6">
						{metadataFields.map((item, index) => (
							<div key={item.id} className="flex items-start gap-6">
								<Field className="flex-1">
									<Input
										placeholder="Key (e.g. Budget, Color, Server)"
										name={`metadata[${index}].key`}
										defaultValue={item.key}
									/>
								</Field>

								<Field className="flex-1">
									<Input placeholder="Value" name={`metadata[${index}].value`} defaultValue={item.value} />
								</Field>

								<Button type="button" variant="destructive" size="icon-sm" onClick={() => removeMetadataRow(item.id)}>
									<Trash2 />
								</Button>
							</div>
						))}
					</CardContent>
				</Card>
			</Field>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add project"} />
		</Form>
	)
}
