import TwinkleSpikes from "@/components/common/TwinkleSpikes";
import ConnectWalletModal from "@/components/container/ConnectWalletModal";

export default function page() {
	return (
		<section className="flex justify-center items-center min-h-screen overflow-hidden">
			<TwinkleSpikes />
			<ConnectWalletModal />
		</section>
	);
}
