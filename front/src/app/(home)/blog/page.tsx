import { blogNames } from "@/lib/blog";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

// METADATA
export const metadata: Metadata = {
	title: "Blog",
	description: "Learn about our website and find answers to your questions",
};

export default function Home() {
	return (
		<main className="flex justify-center items-center flex-col gap-10 mt-28">
			<header>
				<h2 className="lg:text-5xl">Blogs</h2>
			</header>
			<section className="grid min-h-screen grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-4/5 gap-5 lg:gap-10 lg:gap-x-20 ">
				{/* Mapping through blogNames */}
				{blogNames.map(({ title, slug }: { title: string; slug: string }) => (
					<Link key={slug} href={`${slug}`} className="">
						<Card className="border border-primary-black dark:border-white flex justify-center items-center min-h-20">
							<CardTitle className="text-center text-xl">{title}</CardTitle>
						</Card>
					</Link>
				))}
			</section>
		</main>
	);
}
