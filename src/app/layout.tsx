import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const metadata: Metadata = {
	title: 'LoL Custom Tools',
	description: 'Useful tools for LoL custom match.',
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
