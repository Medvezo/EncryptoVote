import Image from "next/image";
import Link from "next/link";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// import AddVoteModal from "@/components/container/AddVoteModal";
import dynamic from "next/dynamic";
const AddVoteModal = dynamic(
	() => import("@/components/container/AddVoteModal"),
	{
		ssr: false,
		loading: () => (
			<Button size="sm" className="h-8 gap-1">
				<PlusCircle className="h-3.5 w-3.5" />
				Add Vote
			</Button>
		),
	}
);

export default function Dashboard() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="flex items-center">
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-8 gap-1">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<AddVoteModal />
					</div>
				</div>
				<section>
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Products</CardTitle>
							<CardDescription>
								Manage your products and view their sales performance.
							</CardDescription>
						</CardHeader>
						<CardContent>
							
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing <strong>1-10</strong> of <strong>32</strong> products
							</div>
						</CardFooter>
					</Card>
				</section>
			</main>
		</div>
	);
}
