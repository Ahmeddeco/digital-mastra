import { getAllArticlesForPage, getAllArticlesForSelect, getOneArticle } from "@/dl/article.data"

export type getAllArticlesForPageType = Awaited<ReturnType<typeof getAllArticlesForPage>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>
export type getAllArticlesForSelectType = Awaited<ReturnType<typeof getAllArticlesForSelect>>