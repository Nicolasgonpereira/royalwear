import React from "react";

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	position?: "left" | "right" | "top" | "bottom";
	children: React.ReactNode;
	className?: string;
	width?: string;
	height?: string;
}

export default function Drawer({
	isOpen,
	onClose,
	position = "right",
	children,
	className = "",
	width = "w-80",
	height = "h-full"
}: DrawerProps) {
	const positionClasses = {
		left: `fixed top-0 left-0 ${height} ${width} transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
		right: `fixed top-0 right-0 ${height} ${width} transform ${isOpen ? "translate-x-0" : "translate-x-full"}`,
		top: `fixed top-0 left-0 w-full h-auto transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`,
		bottom: `fixed bottom-0 left-0 w-full h-auto transform ${isOpen ? "translate-y-0" : "translate-y-full"}`
	};

	const overlayClasses = `fixed inset-0 bg-background bg-opacity-50 z-40 transition-opacity duration-300 ${
		isOpen ? "opacity-60" : "opacity-0 pointer-events-none"
	}`;

	const drawerClasses = `
    fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out
    ${positionClasses[position]}
    ${className}
  `;

	return (
		<>
			{isOpen && (
				<div
					className={overlayClasses}
					onClick={onClose}
					aria-hidden="true"
				/>
			)}

			<div className={drawerClasses} role="dialog" aria-modal="true">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
					aria-label="Close drawer"
				>
					X
				</button>

				<div className="p-6">{children}</div>
			</div>
		</>
	);
}
