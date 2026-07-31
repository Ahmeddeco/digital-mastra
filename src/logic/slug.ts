import slugify from "slugify"

export const slug = (title: string) => {
  return slugify(title, { lower: true, strict: true, })
}