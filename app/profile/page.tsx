"use client";

import { useUser } from "@/context/userContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const { user, setUser } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	const handleLogout = async () => {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			router.push("/");
			setUser(null);
		}
	};

	if (!user) {
		return (
			<main className="min-h-screen flex items-center justify-center">
				Redirecting...
			</main>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-secondaryBg rounded-lg shadow p-6 mb-6">
					<div className="flex items-center space-x-4">
						<Image
							src={
								"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
							}
							alt="Profile"
							width={80}
							height={80}
							className="rounded-full"
						/>
						<div>
							<h1 className="text-2xl text-secondaryBGForeground font-bold">
								{user.name.split(" ")[0]}
							</h1>
							<p className="text-secondaryBGForeground">
								{user.email}
							</p>
							<p>
								{user.role === "ADMIN"
									? "Admin"
									: "Regular User"}
							</p>
							<button onClick={handleLogout}>Logout</button>
						</div>
					</div>
				</div>

				<div className="bg-secondaryBg rounded-lg shadow p-6">
					<h2 className="text-xl text-secondaryBGForeground font-semibold mb-4">
						Order History
					</h2>
					{user.id === "0" ? (
						<p className="text-secondaryBGForeground">
							No orders yet
						</p>
					) : (
						<div className="space-y-4">
							{/* Order history will be mapped here */}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
