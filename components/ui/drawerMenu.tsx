import React from "react";

interface DrawerProps {
	isOpen: boolean;
	position?: "left" | "right" | "top" | "bottom";
	children: React.ReactNode;
	className?: string;
	width?: string;
	height?: string;
}

export default function DrawerMenu({
	isOpen,
	position = "right",
	children,
	className = "",
	width = "w-80",
	height = "h-full"
}: DrawerProps) {
	const positionClasses = {
		left: `fixed ${height} ${width} transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
		right: `fixed ${height} ${width} transform ${isOpen ? "translate-x-0" : "translate-x-full"}`,
		top: `fixed w-full h-auto transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`,
		bottom: `fixed  w-full h-auto transform ${isOpen ? "translate-y-0" : "translate-y-full"}`
	};

	const drawerClasses = `
    fixed z-10 bg-background transition-transform duration-300 ease-in-out
    ${positionClasses[position]}
    ${className}
  `;

	return (
		<>
			<div className={drawerClasses} role="dialog" aria-modal="true">
				{children}
			</div>
		</>
	);
}
