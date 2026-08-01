import { z } from 'zod';
import { ProjectCategorySchema } from '../inputTypeSchemas/ProjectCategorySchema'

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  category: ProjectCategorySchema,
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  articleBodyAr: z.string(),
  articleBodyEn: z.string(),
  resources: z.string().array(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema;
