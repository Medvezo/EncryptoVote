import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const oxanium = Oxanium({ subsets: ["latin"] });

export const metadata: Metadata = {
	openGraph: {
		images: '/Logo.webp',
	  },
	alternates: {
		canonical: '/',
		languages: {
		  'en-US': '/en-US',
		  'de-DE': '/de-DE',
		},
	  },
	title: {
		template: "%s | EncryptoVote",
		default: "EncryptoVote",
	},
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
				<ToastContainer theme="colored" position="top-center" />
			</body>
		</html>
	);
}
