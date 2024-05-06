import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Logo from "../common/Logo";
import NavBar from "./NavBar";

export default function MobileSideBar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 lg:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetClose asChild>
					<nav className="flex flex-col gap-6 text-lg font-medium">
						<Logo href="/dashboard" noText size={70} />
						<NavBar isMobile />
					</nav>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}
