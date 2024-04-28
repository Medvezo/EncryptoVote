import AppHeader from "@/components/layout/AppHeader";
import MobileSideBar from "@/components/layout/MobileSideBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AppHeader />
			<MobileSideBar />
			{children}
		</>
	);
}
