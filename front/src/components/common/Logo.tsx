import Link from "next/link";
import Image from "next/image";

type TLogo = {
	size: number;
	noText?: boolean;
    href: string;
};

export default function Logo({ size, noText, href }: TLogo) {
	return (
		<Link
			href={`${href}`}
			className={`relative flex flex-row justify-center items-center gap-5 group`}
		>
			<Image
				src={"/Logo.webp"}
				alt="EncryptoVote logo"
				width={size}
				height={size}
				className="rounded-full min-w-16 min-h-16"
			/>
			{!noText && (
				<h1 className="hidden sm:block text-xl sm:text-2xl lg:text-3xl ">
					Encrypto
					<span className="absolute top-1/2 -translate-y-1/2 group-hover:text-4xl text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-cyan-300 transition-all duration-300 ease-out">
						Vote
					</span>
				</h1>
			)}
            
		</Link>
	);
}
