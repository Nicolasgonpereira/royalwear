"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
	triggerRevalidation: () => void;
};

type User = {
	id: string;
	name: string;
	email: string;
	role: "ADMIN" | "USER";
};

export const userContext = createContext<UserContextType | undefined>(
	undefined
);

export default function UserProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<User | null>(null);
	const [revalidate, setRevalidate] = useState<boolean>(false);

	useEffect(() => {
		const checkCookies = () => {
			const cookies = document.cookie.split(";");
			const tokenCookie = cookies.find((cookie) =>
				cookie.trim().startsWith("token=")
			);
			if (!tokenCookie) {
				setUser(null);
				return false;
			}
			return true;
		};

		if (!checkCookies()) return;
		fetchUser();
	}, [revalidate]);

	const fetchUser = async () => {
		const response = await fetch("/api/auth/verify");
		if (response.ok) {
			const userData = (await response.json()).user;
			const { id, name, email, role } = userData;
			setUser({ id, name, email, role });
		} else {
			setUser(null);
		}
	};

	const triggerRevalidation = () => {
		setRevalidate((prev) => !prev);
	};

	return (
		<userContext.Provider value={{ user, setUser, triggerRevalidation }}>
			{children}
		</userContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(userContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
