"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
	user: User | null;
	setUser: (user: User) => void;
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

	useEffect(() => {
		fetchUser();
	}, []);

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

	return (
		<userContext.Provider value={{ user, setUser }}>
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
