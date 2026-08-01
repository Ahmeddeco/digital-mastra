"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { addArticleAction } from "@/actions/article.action"
import ArticleSchema from "@/schemas/ArticleSchema"
import TiptapEditor from "@/components/shared/TiptapEditor"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import DynamicInputs from "@/components/shared/DynamicInputs"

export default function AddArticle() {
	const [lastResult, action] = useActionState(addArticleAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ArticleSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<div className="flex lg:flex-row flex-col gap-6">
				{/* --------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
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
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={fields.titleEn.initialValue}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>
			{/* -------------------------------- category -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.category.name}>{fields.category.name}</FieldLabel>
				<Select
					key={fields.category.key}
					name={fields.category.name}
					defaultValue={ProjectCategorySchema.enum.development}
				>
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

			{/* ------------------------------ descriptionAr ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
				<Textarea
					key={fields.descriptionAr.key}
					name={fields.descriptionAr.name}
					defaultValue={fields.descriptionAr.initialValue}
				/>
				<FieldError>{fields.descriptionAr.errors}</FieldError>
			</Field>

			{/* ------------------------------ descriptionEn ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
				<Textarea
					key={fields.descriptionEn.key}
					name={fields.descriptionEn.name}
					defaultValue={fields.descriptionEn.initialValue}
				/>
				<FieldError>{fields.descriptionEn.errors}</FieldError>
			</Field>

			{/* ------------------------------ articleBodyAr ----------------------------- */}
			<TiptapEditor
				name={fields.articleBodyAr.name}
				editorKey={fields.articleBodyAr.key ?? ""}
				defaultValue={fields.articleBodyAr.initialValue ?? ""}
				label={"article Body ar"}
				errors={fields.articleBodyAr.errors ?? []}
			/>

			{/* ------------------------------ articleBodyEn ----------------------------- */}
			<TiptapEditor
				name={fields.articleBodyEn.name}
				editorKey={fields.articleBodyEn.key ?? ""}
				defaultValue={fields.articleBodyEn.initialValue ?? ""}
				label={"article Body En"}
				errors={fields.articleBodyEn.errors ?? []}
			/>

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

			<DynamicInputs
				inputKey={fields.resources.key ?? ""}
				name={fields.resources.name ?? ""}
				label={"resources"}
				errors={fields.resources.errors ?? []}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add article"} />
		</Form>
	)
}
