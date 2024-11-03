import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const metadata: Metadata = {
	title: 'LoL Draft Pick',
	description: 'Useful tool for simulating LoL draft ban-pick system.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Analytics />
				<SpeedInsights />
				<KumaRegistry>{children}</KumaRegistry>
			</body>
		</html>
	);
}
