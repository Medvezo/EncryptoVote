import Link from "next/link";
import { navigation } from "@/lib/const";

export default function Footer() {
	return (
		<footer className="bg-black ">
			<div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
				<nav
					className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
					aria-label="Footer"
				>
					{navigation.main.map((item) => (
						<div key={item.name} className="pb-6">
							<Link
								href={item.href}
								className="text-sm leading-6 text-gray-200 hover:text-gray-400"
							>
								{item.name}
							</Link>
						</div>
					))}
				</nav>
				<p className="mt-10 text-center text-xs leading-5 text-gray-300">
					&copy; 2024 EncryptoVote, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
