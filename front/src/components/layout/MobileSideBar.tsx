import { Menu, Package2 } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

export default function MobileSideBar() {
	return (
		<nav className="absolute left-2 top-2 z-40">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
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
		</nav>
	);
}
