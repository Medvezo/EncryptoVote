import TwinkleSpikes from "@/components/common/TwinkleSpikes";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSignUpForm() {
	return (
		<main className="flex justify-center items-center w-full h-screen">
			<section className="w-full mx-auto flex flex-col gap-5 p-4 md:p-8">
				<aside className="flex justify-center items-center gap-5 w-full">
					<Skeleton className="h-24 w-24 rounded-full" />
					<Skeleton className="h-4 w-1/6 mb-2" />
				</aside>
				<div className="max-w-md mx-auto rounded-md shadow-input bg-white dark:bg-blue-950 p-4 md:p-8 w-full">
					<Skeleton className="h-6 w-1/4 mb-4" />
					<Skeleton className="h-4 w-11/12 mb-8" />
					<form className="space-y-6 w-full">
						<div>
							<Skeleton className="h-4 w-1/4 mb-2" />
							<Skeleton className="h-10 w-full rounded-md" />
						</div>
						<div>
							<Skeleton className="h-4 w-1/4 mb-2" />
							<Skeleton className="h-10 w-full rounded-md" />
						</div>
						<div>
							<Skeleton className="h-4 w-1/4 mb-2" />
							<Skeleton className="h-10 w-full rounded-md" />
						</div>
						<div>
							<Skeleton className="h-4 w-1/4 mb-2" />
							<Skeleton className="h-10 w-full rounded-md" />
						</div>
						<Skeleton className="h-10 w-full rounded-md mb-4" />
					</form>
					<Skeleton className="h-1 w-full bg-gray-300 dark:bg-gray-700 my-8" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			</section>
			<TwinkleSpikes />
		</main>
	);
}
