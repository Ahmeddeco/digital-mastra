import { z } from 'zod'

export const ArticleSchema = z.object({
  id: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  articleBodyAr: z.string(),
  articleBodyEn: z.string(),
  resources: z.string().array(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema
