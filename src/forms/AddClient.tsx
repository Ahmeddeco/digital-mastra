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
import { addClientAction } from "@/actions/client.action"
import ClientSchema from "@/schemas/ClientSchema"
import CountryInput from "@/components/navigation/CountryInput"

export default function AddClient() {
	const [lastResult, action] = useActionState(addClientAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ClientSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* ---------------------------------- companyName --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.companyName.name}>{fields.companyName.name}</FieldLabel>
					<Input
						type="text"
						key={fields.companyName.key}
						name={fields.companyName.name}
						defaultValue={fields.companyName.initialValue}
					/>
					<FieldError>{fields.companyName.errors}</FieldError>
				</Field>

				{/* ------------------------------ industry ------------------------------ */}
				<Field>
					<FieldLabel htmlFor={fields.industry.name}>{fields.industry.name}</FieldLabel>
					<Input
						type="text"
						key={fields.industry.key}
						name={fields.industry.name}
						defaultValue={fields.industry.initialValue}
					/>
					<FieldError>{fields.industry.errors}</FieldError>
				</Field>

				{/* --------------------------------- workTel --------------------------------- */}
				<Phone
					name={fields.workTel.name}
					defaultValue={fields.workTel.initialValue!}
					errors={fields.workTel.errors}
					label="work tel"
				/>

				{/* --------------------------------- secondaryTel --------------------------------- */}
				<Phone
					name={fields.secondaryTel.name}
					defaultValue={fields.secondaryTel.initialValue!}
					errors={fields.secondaryTel.errors}
					label="secondary Tel"
				/>
			</div>

			{/* --------------------------------- website -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.website.name}>{fields.website.name}</FieldLabel>
				<Input
					type="url"
					key={fields.website.key}
					name={fields.website.name}
					defaultValue={fields.website.initialValue}
				/>
				<FieldError>{fields.website.errors}</FieldError>
			</Field>

			{/* --------------------------------- address -------------------------------- */}
			<CountryInput />

			{/* ------------------------------------ logo -------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.logo.name}
				imageKey={fields.logo.key}
				errors={fields.logo.errors}
				label="logo"
			/>

			{/* ------------------------------- SubmitButton ----------------------------- */}
			<SubmitButton text={"add client"} />
		</Form>
	)
}
