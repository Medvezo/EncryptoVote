import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
	return (
		<div className="w-full h-20 fixed top-0 shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-50 lg:px-10">
			<div className="w-full h-full flex flex-row items-center justify-between m-auto px-3 overflow-hidden">
				<Link
					href={"/"}
					className=" relative flex flex-row justify-center items-center gap-5 group"
				>
					<Image
						src={"/Logo.webp"}
						alt="EncryptoVote logo"
						width={70}
						height={70}
						className="rounded-full"
					/>
					<h1 className="text-xl sm:text-2xl lg:text-3xl ">
						Encrypto
						<span className="absolute top-1/2 -translate-y-1/2 group-hover:text-4xl text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-cyan-300 transition-all duration-300 ease-out">
							Vote
						</span>
					</h1>
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
