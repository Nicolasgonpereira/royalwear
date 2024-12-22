import Header from "@/components/layout/Header";
import CartProvider from "@/context/cartContext";
import UserProvider from "@/context/userContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900"
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900"
});

export const metadata: Metadata = {
	title: "Royal Wear",
	description: "Use Royal"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<UserProvider>
					<CartProvider>
						<Header />
						{children}
					</CartProvider>
				</UserProvider>
			</body>
		</html>
	);
}
