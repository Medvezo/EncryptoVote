"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/const";

export default function NavBar({ isMobile }: { isMobile?: boolean }) {
	const pathname = usePathname();

	return (
		<div
			className={`${
				isMobile ? "flex-col" : "hidden"
			} text-xl space-y-5 lg:space-y-0 lg:mr-16 lg:flex lg:justify-center lg:items-center lg:space-x-8 lg:text-lg`}
		>
			{Object.values(navigation)
				.flat()
				.map((item) => (
					<div key={item.name}>
						<Link
							href={item.href}
							className={`inline-flex items-center border-b-2 px-1 pt-1 font-medium transition-all duration-300 ease-in-out ${
								pathname === item.href
									? "border-amber-500 text-white"
									: "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600"
							}`}
						>
							{item.name}
						</Link>
					</div>
				))}
		</div>
	);
}
