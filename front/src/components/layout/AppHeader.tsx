import Link from "next/link";
import { CircleUser, Search } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Logo from "../common/Logo";

export default function AppHeader({ children }: { children: React.ReactNode }) {
	return (
		<header className="sticky top-0 flex h-20 items-center gap-4 border-b shadow-lg shadow-blue-950/50 bg-[#03001417] backdrop-blur-md z-40 px-4 lg:px-6 ">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Logo size={70} noText href="/dashboard" />
				<Link
					href="#"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Dashboard
				</Link>
				<Link
					href="#"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Orders
				</Link>
				<Link
					href="#"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Products
				</Link>
				<Link
					href="#"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Customers
				</Link>
				<Link
					href="#"
					className="text-foreground transition-colors hover:text-foreground"
				>
					Settings
				</Link>
			</nav>

			{children}

			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
