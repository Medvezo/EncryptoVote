"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { blogNames } from "@/lib/blog"; // Adjust the import path accordingly

export default function BlogSideBar() {
	const pathname = usePathname();

	return (
		<div className="hidden lg:block min-w-fit py-6 px-3 pr-5 border-r border-primary-green">
			{blogNames.map((blog :any, index:number) => (
				<Link
					key={index}
					href={blog.slug}
					className={`block p-2 ${
						pathname === blog.slug
							? "text-black dark:text-white underline underline-offset-4"
							: "text-gray-500"
					}`}>
					{blog.title}
				</Link>
			))}
		</div>
	);
}
