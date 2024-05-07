"use client";

import Link from "next/link";
import { CircleUser, Wallet, Plus } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Logo from "../common/Logo";
import NavBar from "./NavBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AppHeader({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const handleLogout = () => {
		Cookies.remove("user_email");
		router.push("/")
	};

	return (
		<header className="sticky top-0 flex h-20 items-center gap-4 border-b shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-40 px-4 lg:px-6 ">
			<nav className="flex justify-center items-center gap-5 text-lg font-medium md:text-sm lg:gap-6">
				{children}
				<Logo size={70} noText href="/dashboard" />
				<NavBar />
			</nav>

			<div className="flex w-full  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<Link className="ml-auto" href={"/connect-wallet"}>
					<Button variant={"accent"}>
						<Wallet className="w-8 h-8 " />
						<Plus className="w-8 h-8 " />
					</Button>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
