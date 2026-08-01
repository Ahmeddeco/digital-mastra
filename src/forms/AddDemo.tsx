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
import { addDemoAction } from "@/actions/demo.action"
import TiptapEditor from "@/components/shared/TiptapEditor"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { getAllProjectsForSelectType } from "@/types/project.type"
import { slug } from "@/logic/slug"
import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"

type Props = {
	projects: getAllProjectsForSelectType
}

export default function AddDemo({ projects }: Props) {
	const [lastResult, action] = useActionState(addDemoAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: DemoSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	const [slugInput, setSlugInput] = useState("")

	return (
		<Form {...getFormProps(form)} action={action} className="space-y-6">
			{/* --------------------------------- slug -------------------------------- */}
			<Input type="hidden" key={fields.slug.key} name={fields.slug.name} value={slug(slugInput)} readOnly />

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
						onChange={(e) => setSlugInput(e.target.value)}
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
				{/* ------------------------------ painPointsAr ----------------------------- */}
				<TiptapEditor
					name={fields.painPointsAr.name}
					editorKey={fields.painPointsAr.key ?? ""}
					defaultValue={fields.painPointsAr.initialValue ?? ""}
					label={"pain Points Ar"}
					errors={fields.painPointsAr.errors ?? []}
				/>

				{/* ------------------------------ painPointsEn ----------------------------- */}
				<TiptapEditor
					name={fields.painPointsEn.name}
					editorKey={fields.painPointsEn.key ?? ""}
					defaultValue={fields.painPointsEn.initialValue ?? ""}
					label={"pain Points Ar"}
					errors={fields.painPointsEn.errors ?? []}
				/>

				{/* ------------------------------ solutionsAr ----------------------------- */}
				<TiptapEditor
					name={fields.solutionsAr.name}
					editorKey={fields.solutionsAr.key ?? ""}
					defaultValue={fields.solutionsAr.initialValue ?? ""}
					label={"solutions En"}
					errors={fields.solutionsAr.errors ?? []}
				/>

				{/* ------------------------------ solutionsEn ----------------------------- */}
				<TiptapEditor
					name={fields.solutionsEn.name}
					editorKey={fields.solutionsEn.key ?? ""}
					defaultValue={fields.solutionsEn.initialValue ?? ""}
					label={"solutions En"}
					errors={fields.solutionsEn.errors ?? []}
				/>

				{/* -------------------------------- projectId -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.projectId.id}>project</FieldLabel>
					<Select key={fields.projectId.key} name={fields.projectId.name} defaultValue={fields.projectId.initialValue}>
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

				{/* --------------------------------- liveUrl -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.liveUrl.id}>{fields.liveUrl.name}</FieldLabel>
					<Input
						type="url"
						key={fields.liveUrl.key}
						name={fields.liveUrl.name}
						defaultValue={fields.liveUrl.initialValue}
					/>
					<FieldError>{fields.liveUrl.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add demo"} />
		</Form>
	)
}
