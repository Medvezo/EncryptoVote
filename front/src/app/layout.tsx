import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
			<body className={`${oxanium.className} bg-slate-900`}>
				{children}
				<ToastContainer theme="colored" />
			</body>
		</html>
	);
}
