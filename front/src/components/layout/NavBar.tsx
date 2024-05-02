"use client";

import { navigation } from "@/lib/const";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
	const pathname = usePathname();

	return (
		<div className="hidden sm:text-sm  md:mr-16 md:flex md:justify-center md:items-center md:space-x-8 lg:text-lg ">
			{navigation.main.map((item) => (
				<div key={item.name}>
					<Link
						href={item.href}
						// Apply conditional styles based on the current path
						className={`inline-flex items-center border-b-2 px-1 pt-1 font-medium transition-all duration-300 ease-in-out ${
							pathname === item.href
								? "border-amber-500 text-white" // Styles if the URL matches
								: "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600" // Default styles
						}`}
					>
						{item.name}
					</Link>
				</div>
			))}
		</div>
	);
}
