import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { web3Faqs, accountFaqs, paymentFaqs } from "@/lib/const";


export default function FaqSection() {
    const faqCategories = [
        {
            title: "Web3",
            faqs: web3Faqs
        },
        {
            title: "Account",
            faqs: accountFaqs
        },
        {
            title: "Payment",
            faqs: paymentFaqs
        }
    ];

    return (
        <section className="w-full my-16 px-5 md:px-10 ">
            <h3 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-primary-orange">
                Frequently Asked Questions
            </h3>
            {faqCategories.map((category) => (
                <div key={category.title} className="mb-8">
                    <h4 className="text-2xl font-semibold mb-4  text-center text-amber-200">{category.title}</h4>
                    <Accordion type="single" collapsible className="max-w-4xl mx-auto">
                        {category.faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${category.title.toLowerCase()}-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ))}
        </section>
    );
}
