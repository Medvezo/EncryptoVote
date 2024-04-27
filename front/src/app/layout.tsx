import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Encrypto Vote",
	description:
		"Decentralized Voting system in Web 3.0 for companies and goverments",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={oxanium.className}>{children}</body>
		</html>
	);
}
