import TwinkleSpikes from "@/components/common/TwinkleSpikes";
import ConnectWalletModal from "@/components/container/ConnectWalletModal";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Connect Wallet",
};

export default function page() {
	return (
		<section className="flex justify-center items-center min-h-screen overflow-hidden">
			<TwinkleSpikes />
			<ConnectWalletModal />
		</section>
	);
}
