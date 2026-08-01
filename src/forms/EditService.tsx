"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import ServiceSchema from "@/schemas/ServiceSchema"
import { addServiceAction } from "@/actions/service.action"
import { Textarea } from "@/components/ui/textarea"
import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { getOneServiceType } from "@/types/service.type"

type Props = {
	service: getOneServiceType
}

export default function EditService({ service }: Props) {
	const [lastResult, action] = useActionState(addServiceAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ServiceSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={service?.id} />
			{/* ---------------------------------- nameAr --------------------------------- */}
			<div className="flex lg:flex-row flex-col gap-6">
				{/* --------------------------------- nameAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.nameAr.name}>{fields.nameAr.name}</FieldLabel>
					<Input type="text" key={fields.nameAr.key} name={fields.nameAr.name} defaultValue={service?.nameAr} />
					<FieldError>{fields.nameAr.errors}</FieldError>
				</Field>

				{/* --------------------------------- nameEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.nameEn.name}>{fields.nameEn.name}</FieldLabel>
					<Input type="text" key={fields.nameEn.key} name={fields.nameEn.name} defaultValue={service?.nameEn} />
					<FieldError>{fields.nameEn.errors}</FieldError>
				</Field>
			</div>

			{/* ------------------------------ descriptionAr ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
				<Textarea
					key={fields.descriptionAr.key}
					name={fields.descriptionAr.name}
					defaultValue={service?.descriptionAr ?? ""}
				/>
				<FieldError>{fields.descriptionAr.errors}</FieldError>
			</Field>

			{/* ------------------------------ descriptionEn ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
				<Textarea
					key={fields.descriptionEn.key}
					name={fields.descriptionEn.name}
					defaultValue={service?.descriptionEn ?? ""}
				/>
				<FieldError>{fields.descriptionEn.errors}</FieldError>
			</Field>

			{/* -------------------------------- category -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.category.name}>{fields.category.name}</FieldLabel>
				<Select key={fields.category.key} name={fields.category.name} defaultValue={service?.category}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.values(ProjectCategorySchema.Enum).map((category) => (
							<SelectItem value={category!} key={category!}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.category.errors}</FieldError>
			</Field>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit service"} />
		</Form>
	)
}
