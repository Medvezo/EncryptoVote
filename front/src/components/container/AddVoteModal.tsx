"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddVoteModal() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		<Button size="sm" className="h-8 gap-1">
			<PlusCircle className="h-3.5 w-3.5" />
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Add Vote
			</span>
		</Button>;
	}

	return (
		<>
			{/* Add Vote Button */}
			<AlertDialog>
				<AlertDialogTrigger>
					<Button size="sm" className="h-8 gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Vote
						</span>
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent>
					<AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl">Create new Vote</AlertDialogTitle>
						<form>
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input id="name" placeholder="Name of Vote" />
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="voteID">VoteID</Label>
									<Input id="voteID" placeholder="**** **** ****" />
								</div>
							</div>
						</form>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
