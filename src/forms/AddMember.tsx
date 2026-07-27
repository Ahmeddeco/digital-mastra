"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import ClientMemberSchema from "@/schemas/ClientMemberSchema"
import { addMemberAction } from "@/actions/member.action"
import { getAllUsersForSelectType } from "@/types/user.type"
import { getAllClientsForSelectType } from "@/types/client.type"
import { Switch } from "@/components/ui/switch"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { FaUserTie } from "react-icons/fa6"

type Props = {
	allUsers: getAllUsersForSelectType
	allClients: getAllClientsForSelectType
}

export default function AddMember({ allClients, allUsers }: Props) {
	const [lastResult, action] = useActionState(addMemberAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ClientMemberSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------------- position --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.position.name}>{fields.position.name}</FieldLabel>
				<Input
					type="text"
					key={fields.position.key}
					name={fields.position.name}
					defaultValue={fields.position.initialValue}
				/>
				<FieldError>{fields.position.errors}</FieldError>
			</Field>

			{/* ---------------------------------- clientId ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.clientId.name}>client</FieldLabel>
				<Select key={fields.clientId.key} name={fields.clientId.name} defaultValue={fields.clientId.initialValue}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{allClients?.map(({ id, companyName }) => (
							<SelectItem value={id} key={id}>
								{companyName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.clientId.errors}</FieldError>
			</Field>

			{/* ---------------------------------- userId ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.userId.name}>user</FieldLabel>
				<Select key={fields.userId.key} name={fields.userId.name} defaultValue={fields.userId.initialValue}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{allUsers?.map(({ id, name }) => (
							<SelectItem value={id} key={id}>
								{name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.userId.errors}</FieldError>
			</Field>

			{/* ---------------------------------- isPrimary ---------------------------------- */}
			<Field>
				<FieldLabel>is Primary</FieldLabel>
				<Item>
					<ItemMedia variant="image">
						<FaUserTie size={32} />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>is primary</ItemTitle>
						<ItemDescription>Is this member is the primary on in client agency?</ItemDescription>
					</ItemContent>
					<ItemActions>
						<Switch
							id={fields.isPrimary.id}
							key={fields.isPrimary.key}
							name={fields.isPrimary.name}
							defaultChecked={!!fields.isPrimary.initialValue}
						/>
					</ItemActions>
				</Item>
				<FieldError>{fields.position.errors}</FieldError>
			</Field>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add client member"} />
		</Form>
	)
}
