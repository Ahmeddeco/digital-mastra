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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { editClientAction } from "@/actions/client.action"
import ClientSchema from "@/schemas/ClientSchema"
import { getAllUsersForSelectType } from "@/types/user.type"
import Gps from "@/components/navigation/Gps"
import { getOneClientType } from "@/types/client.type"

type Props = {
	users: getAllUsersForSelectType
	client: getOneClientType
}

export default function EditClient({ users, client }: Props) {
	const [lastResult, action] = useActionState(editClientAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ClientSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	console.log("client from EditClient", client)

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={client?.id} name="id" />
			{/* ---------------------------------- companyName --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.companyName.name}>{fields.companyName.name}</FieldLabel>
				<Input
					type="text"
					key={fields.companyName.key}
					name={fields.companyName.name}
					defaultValue={client?.companyName}
				/>
				<FieldError>{fields.companyName.errors}</FieldError>
			</Field>

			{/* ----------------------------------- Tel ---------------------------------- */}
			<div className="flex lg:flex-row flex-col gap-6">
				{/* --------------------------------- tel --------------------------------- */}
				<Phone name={fields.tel.name} defaultValue={client?.tel ?? ""} errors={fields.tel.errors} />

				{/* --------------------------------- secondaryTel --------------------------------- */}
				<Phone
					name={fields.secondaryTel.name}
					defaultValue={client?.secondaryTel ?? ""}
					errors={fields.secondaryTel.errors}
					label="secondary Tel"
				/>
			</div>

			{/* ---------------------------------- users ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.userId.name}>owner</FieldLabel>
				<Select key={fields.userId.key} name={fields.userId.name} defaultValue={client?.owner.id}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{users?.map(({ id, name }) => (
							<SelectItem value={id} key={id}>
								{name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.userId.errors}</FieldError>
			</Field>

			{/* ------------------------------------ logo -------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.logo.name}
				imageKey={fields.logo.key}
				errors={fields.logo.errors}
				label="logo"
				dbImage={client?.logo ?? ""}
			/>

			{/* ----------------------------------- Gps ---------------------------------- */}
			<Gps
				addressDb={{ city: client?.city ?? "", country: client?.country ?? "", state: client?.state ?? "" }}
				cord={{ cord: { lat: Number(client?.lat), lng: Number(client?.lng) } }}
			/>

			{/* ------------------------------- SubmitButton ----------------------------- */}
			<SubmitButton text={"edit client"} />
		</Form>
	)
}
