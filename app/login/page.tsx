"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
	const apiUrl = process.env.API_URL || "http://localhost:3000/api";
	const [email, setEmail] = useState("nicolasgp.ec@gmail.com");
	const [password, setPassword] = useState("admin123");

	const router = useRouter();

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await fetch(`${apiUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			console.log("Login successful");
			router.push("/");
		} else {
			console.error("Login failed");
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-primaryBg text-primaryBgForeground px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="text-center text-3xl font-extrabold">
						Login to your account
					</h2>
				</div>
				<form className="space-y-6" onSubmit={handleLogin}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Your
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input text-primaryBgForeground rounded-t-md focus:outline-none focus:ring-ring focus:z-10 sm:text-sm"
								placeholder="Your email"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input text-primaryBgForeground rounded-b-md focus:outline-none focus:ring-ring focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primaryForeground bg-primary hover:ring-2 hover:ring-ring focus:outline-none focus:ring-2 focus:ring-ring"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
