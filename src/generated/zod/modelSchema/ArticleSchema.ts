import { z } from 'zod';

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  articleBodyAr: z.string(),
  articleBodyEn: z.string(),
  resources: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema;
