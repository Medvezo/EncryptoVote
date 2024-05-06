import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../common/Logo";
import NavBar from "./NavBar";
import MobileSideBar from "./MobileSideBar";

export default function Header() {
	return (
		<div className="w-full h-20 fixed top-0 shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-50 lg:px-10">
			<div className="w-full h-full flex flex-row items-center justify-between m-auto px-3 overflow-hidden">
				<div className="flex justify-center items-center gap-3">
					<MobileSideBar />
					<Logo size={70} href="/" />
				</div>
				<NavBar />
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
