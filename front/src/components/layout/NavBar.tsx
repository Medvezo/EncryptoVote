"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
	name: string;
	href: string;
}

interface Navigation {
	[key: string]: NavItem[];
}

interface NavBarProps {
	navigation: Navigation;
}

export default function NavBar({ navigation }: NavBarProps) {
	const pathname = usePathname();

	return (
		<div className="hidden sm:text-sm md:mr-16 md:flex md:justify-center md:items-center md:space-x-8 lg:text-lg">
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
