"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import ProjectTypeSchema from "@/schemas/ProjectTypeSchema"
import { addProjectTypeAction } from "@/actions/type.action"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"

export default function EditProjectType() {
	const [lastResult, action] = useActionState(addProjectTypeAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProjectTypeSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} />
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* -------------------------------- category -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.category.name}>category</FieldLabel>
				<Select
					key={fields.category.key}
					name={fields.category.name}
					defaultValue={ProjectCategorySchema.Enum.development}
				>
					<SelectTrigger>
						<SelectValue placeholder={ProjectCategorySchema.Enum.development} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(ProjectCategorySchema.Values).map((category) => (
							<SelectItem value={category} key={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.category.errors}</FieldError>
			</Field>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add Project Type"} />
		</Form>
	)
}
