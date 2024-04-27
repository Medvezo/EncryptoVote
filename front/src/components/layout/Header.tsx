import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
	return (
		<div className="w-full h-20 fixed top-0 shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-50 lg:px-10">
			<div className="w-full h-full flex flex-row items-center justify-between m-auto px-3 overflow-hidden">
				<Link
					href={"/"}
					className="flex flex-row justify-center items-center gap-5"
				>
					<Image
						src={"/Logo.webp"}
						alt="EncryptoVote logo"
						width={70}
						height={70}
						className="rounded-full  "
					/>
					<h1 className="text-xl sm:text-2xl lg:text-3xl">EncryptoVote</h1>
				</Link>
				
				<Button variant={"accent"} asChild>
					<Link href={"/login"} className="font-semibold text-xl">
						{" "}
						Make Vote{" "}
					</Link>
				</Button>
			</div>
		</div>
	);
}
