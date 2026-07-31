import { z } from 'zod';

/////////////////////////////////////////
// DEMO SCHEMA
/////////////////////////////////////////

export const DemoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  painPointsAr: z.string().nullish(),
  painPointsEn: z.string().nullish(),
  solutionsAr: z.string().nullish(),
  solutionsEn: z.string().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  liveUrl: z.string().nullish(),
  deletedAt: z.date().nullish(),
  projectId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Demo = z.infer<typeof DemoSchema>

export default DemoSchema;
