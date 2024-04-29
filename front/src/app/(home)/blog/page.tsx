import { blogNames } from "@/lib/blog";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

// METADATA
export const metadata: Metadata = {
	title: "Blog",
	description: "Learn ",
};

export default function Home() {
	return (
		<>
			
			<section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-4/5 gap-5 lg:gap-10 lg:gap-x-20 mt-20">
				{/* Mapping through blogNames */}
				{blogNames.map(({ title, slug }: { title: string; slug: string }) => (
					<Link key={slug} href={`${slug}`} className="">
						<Card className="border border-primary-black dark:border-white">
							<CardContent className="text-center text-xl">{title}</CardContent>
						</Card>
					</Link>
				))}
			</section>
		</>
	);
}
