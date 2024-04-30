import { Menu, Package2 } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import Logo from "../common/Logo";

export default function MobileSideBar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<nav className="grid gap-6 text-lg font-medium">
					<Logo href="/dashboard" noText size={70} />
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Dashboard
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Orders
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Products
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Customers
					</Link>
					<Link href="#" className="hover:text-foreground">
						Settings
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
