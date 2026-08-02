import { Suspense } from "react"

export default function ArticlesPage() {
	return (
		<Suspense fallback={<div>loading</div>}>
			<h1>Welcome to Articlespage!</h1>;
		</Suspense>
	)
}
