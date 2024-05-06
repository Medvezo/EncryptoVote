import { Mdx } from "@/components/container/Mdx";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { blogNames } from "@/lib/blog";
import BlogSideBar from "@/components/container/BlogSideBar";

type BlogSlugParams = {
	params: {
		slug: string;
	};
};
async function getDocFromParams(slug: string) {
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) notFound();

	return doc;
}

export async function generateStaticParams() {
	return blogNames.map((blogName : any) => ({
		slug: blogName.slug.replace("/", ""), // Remove the leading slash from the slug
	}));
}

// write generateMetadata function for this page
export async function generateMetadata({ params }: BlogSlugParams) {
	const doc = await getDocFromParams(params.slug);

	return {
		title: doc.title,
		description: doc.description,
	};
}

export default async function Home({ params }: BlogSlugParams) {
	const doc = await getDocFromParams(params.slug);

	return (
		<>
			<div className="flex flex-1 lg:gap-10 mt-20 min-h-screen">
				<BlogSideBar />
				<div className="flex flex-col">
					<Mdx code={doc.body.code} />
				</div>
			</div>
		</>
	);
}