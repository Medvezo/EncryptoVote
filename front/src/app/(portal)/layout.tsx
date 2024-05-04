import { WalletProvider } from "@/components/context/WalletContext";
import AppHeader from "@/components/layout/AppHeader";
import MobileSideBar from "@/components/layout/MobileSideBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<WalletProvider>
			<AppHeader>
				<MobileSideBar />
			</AppHeader>
			{children}
		</WalletProvider>
	);
}
