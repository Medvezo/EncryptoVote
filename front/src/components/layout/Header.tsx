import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../common/Logo";

export default function Header() {
	return (
		<div className="w-full h-20 fixed top-0 shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-50 lg:px-10">
			<div className="w-full h-full flex flex-row items-center justify-between m-auto px-3 overflow-hidden">
				<Logo size={70} direction="row"/>

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
