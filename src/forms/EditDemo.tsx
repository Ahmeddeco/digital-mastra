"use client"

import { useActionState, useState } from "react"
import { useForm, getFormProps } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Form from "next/form"
import DemoSchema from "@/schemas/DemoSchema"
import { editDemoAction } from "@/actions/demo.action"
import TiptapEditor from "@/components/shared/TiptapEditor"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { getAllProjectsForSelectType } from "@/types/project.type"
import { slug } from "@/logic/slug"
import { getOneDemoType } from "@/types/demo.type"

type Props = {
	projects: getAllProjectsForSelectType
	demo: getOneDemoType
}

export default function EditDemo({ projects, demo }: Props) {
	const [lastResult, action] = useActionState(editDemoAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: DemoSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	const [slugInput, setSlugInput] = useState(demo?.slug ?? "")

	return (
		<Form {...getFormProps(form)} action={action} className="space-y-6">
			<Input type="hidden" name="id" value={demo?.id} />
			{/* --------------------------------- slug -------------------------------- */}
			<Input type="hidden" key={fields.slug.key} name={fields.slug.name} value={slug(slugInput)} readOnly />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* --------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.id}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={demo?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* --------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.id}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={demo?.titleEn}
						onChange={(e) => setSlugInput(e.target.value)}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>

				{/* ------------------------------ descriptionAr ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionAr.id}>{fields.descriptionAr.name}</FieldLabel>
					<Textarea
						name={fields.descriptionAr.name}
						defaultValue={demo?.descriptionAr ?? ""}
						key={fields.descriptionAr.key}
					/>
					<FieldError>{fields.descriptionAr.errors}</FieldError>
				</Field>

				{/* ------------------------------ descriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.descriptionEn.id}>{fields.descriptionEn.name}</FieldLabel>
					<Textarea
						name={fields.descriptionEn.name}
						defaultValue={demo?.descriptionEn ?? ""}
						key={fields.descriptionEn.key}
					/>
					<FieldError>{fields.descriptionEn.errors}</FieldError>
				</Field>
				{/* ------------------------------ painPointsAr ----------------------------- */}
				<TiptapEditor
					name={fields.painPointsAr.name}
					editorKey={fields.painPointsAr.key ?? ""}
					defaultValue={demo?.painPointsAr ?? ""}
					label={"pain Points Ar"}
					errors={fields.painPointsAr.errors ?? []}
				/>

				{/* ------------------------------ painPointsEn ----------------------------- */}
				<TiptapEditor
					name={fields.painPointsEn.name}
					editorKey={fields.painPointsEn.key ?? ""}
					defaultValue={demo?.painPointsEn ?? ""}
					label={"pain Points Ar"}
					errors={fields.painPointsEn.errors ?? []}
				/>

				{/* ------------------------------ solutionsAr ----------------------------- */}
				<TiptapEditor
					name={fields.solutionsAr.name}
					editorKey={fields.solutionsAr.key ?? ""}
					defaultValue={demo?.solutionsAr ?? ""}
					label={"solutions En"}
					errors={fields.solutionsAr.errors ?? []}
				/>

				{/* ------------------------------ solutionsEn ----------------------------- */}
				<TiptapEditor
					name={fields.solutionsEn.name}
					editorKey={fields.solutionsEn.key ?? ""}
					defaultValue={demo?.solutionsEn ?? ""}
					label={"solutions En"}
					errors={fields.solutionsEn.errors ?? []}
				/>

				{/* -------------------------------- projectId -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.projectId.id}>project</FieldLabel>
					<Select key={fields.projectId.key} name={fields.projectId.name} defaultValue={demo?.projectId ?? ""}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{projects?.map(({ id, titleEn }) => (
								<SelectItem value={id} key={id}>
									{titleEn}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.projectId.errors}</FieldError>
				</Field>

				{/* --------------------------------- liveUrl -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.liveUrl.id}>{fields.liveUrl.name}</FieldLabel>
					<Input type="url" key={fields.liveUrl.key} name={fields.liveUrl.name} defaultValue={demo?.liveUrl ?? ""} />
					<FieldError>{fields.liveUrl.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={demo?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={demo?.images}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit demo"} />
		</Form>
	)
}
