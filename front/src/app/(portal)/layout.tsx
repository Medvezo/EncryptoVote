import SideBar from "@/components/layout/SideBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SideBar />

			{children}
		</>
	);
}
