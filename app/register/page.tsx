"use client";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [response, setResponse] = useState<{ status?: number }>({});
	const [loading, setLoading] = useState<boolean>(false);
	const { triggerRevalidation } = useUser();
	const router = useRouter();

	const handleRegister = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		const registerResponse = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, password })
		});

		if (registerResponse.ok) {
			setResponse({ status: registerResponse.status });
			handleLogin();
		} else {
			setResponse({ status: registerResponse.status });
			setLoading(false);
		}
	};

	const handleLogin = async () => {
		const loginResponse = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		});
		if (loginResponse.ok) {
			setResponse({ status: loginResponse.status });
			triggerRevalidation();
			router.push("/");
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-primaryBg text-primaryBgForeground px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="text-center text-3xl font-extrabold">
						Create your account
					</h2>
				</div>
				<form className="space-y-6" onSubmit={handleRegister}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="name" className="sr-only">
								Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input text-primaryBgForeground rounded-t-md focus:outline-none focus:ring-ring focus:z-10 sm:text-sm"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-input text-primaryBgForeground focus:outline-none focus:ring-ring focus:z-10 sm:text-sm"
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
							Register
						</button>
					</div>
					<div>
						{loading && (
							<div className="text-white text-sm text-center bg-blue-500 p-2 rounded-md -mt-4">
								<svg
									className="animate-spin ml-2 h-5 w-5 inline"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							</div>
						)}
						{!loading && response.status === 400 && (
							<div className="text-white text-sm text-center bg-red-500 p-2 rounded-md -mt-4">
								All fields are required
							</div>
						)}
						{!loading && response.status === 409 && (
							<div className="text-white text-sm text-center bg-red-500 p-2 rounded-md -mt-4">
								Email already registered
							</div>
						)}
						{!loading && response.status === 200 && (
							<div className="text-white text-sm text-center bg-green-500 p-2 rounded-md -mt-4">
								Registration successful
							</div>
						)}
					</div>
				</form>
				<div>
					<p className="text-center text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-medium text-primary hover:text-primary-foreground"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
