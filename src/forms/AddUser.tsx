"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import Phone from "@/components/shared/Phone"
import { addUserAction } from "@/actions/user.action"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Role } from "@/generated/prisma/enums"
import UserSchema from "@/schemas/UserSchema"

export default function AddUser() {
	const [lastResult, action] = useActionState(addUserAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} />
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* -------------------------------- email -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>{fields.email.name}</FieldLabel>
				<Input type="email" key={fields.email.key} name={fields.email.name} defaultValue={fields.email.initialValue} />
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			{/* --------------------------------- mobile --------------------------------- */}
			<Phone name={fields.mobile.name} defaultValue={fields.mobile.initialValue!} errors={fields.mobile.errors} />

			{/* ---------------------------------- role ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.role.name}>{fields.role.name}</FieldLabel>
				<Select key={fields.role.key} name={fields.role.name} defaultValue={Role.user}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(Role).map(([key, value]) => (
							<SelectItem value={value} key={value}>
								{key}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.role.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone imageName={fields.image.name} imageKey={fields.image.key} errors={fields.image.errors} />

			{/* ---------------------------------- idImage --------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.idImage.name}
				imageKey={fields.idImage.key}
				errors={fields.idImage.errors}
				label="id Image"
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add user"} />
		</Form>
	)
}
