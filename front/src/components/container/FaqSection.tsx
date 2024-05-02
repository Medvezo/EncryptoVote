import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
	return (
		<section className="w-full  min-h-96 my-16">
			<h3 className="text-3xl lg:text-4xl font-bold text-center">
				Frequent Asked Questions
			</h3>
			<Accordion
				type="single"
				collapsible
				className="max-w-md px-3 lg:px-0 mx-auto"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
