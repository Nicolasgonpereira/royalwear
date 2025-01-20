"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import DrawerMenu from "../ui/drawerMenu";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { cart } = useCart();

	return (
		<>
			<header
				className={
					"bg-secondary color-secondaryForeground border-b border-border sticky top-0 z-10"
				}
			>
				<div className="flex items-center py-4 gap-4 justify-between md:justify-normal ml-4 mr-4">
					<div className="md:hidden flex flex-row gap-4">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{!isMenuOpen ? (
								<FaBars className="w-6 h-6" />
							) : (
								<FaTimes className="w-6 h-6" />
							)}
						</button>
						<Link
							href="/profile"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<FaUser className="w-6 h-6" />
						</Link>
					</div>
					<div className="text-1xl font-bold">
						<Link href="/" onClick={() => setIsMenuOpen(false)}>
							RoyalWear
						</Link>
					</div>
					<nav className="flex items-center justify-between md:grow">
						<ul className={"hidden md:flex-row md:flex space-x-4"}>
							<li>
								<Link href="/products">Products</Link>
							</li>
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
						<div className="flex items-center space-x-4 ml-auto">
							<Link className="hidden md:block" href="/profile">
								<FaUser className="w-6 h-6" />
							</Link>
							{/* Search feature will be add later */}
							{/* <Link
								href="/search"
								onClick={() => setIsMenuOpen(false)}
							>
								<FaSearch className="w-6 h-6" />
							</Link> */}
							<Link
								href="/cart"
								className="relative"
								onClick={() => setIsMenuOpen(false)}
							>
								<FaShoppingCart className="w-6 h-6" />
								<span className="absolute top-0 -right-2 text-black -translate-y-1/2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
									{cart.length}
								</span>
							</Link>
						</div>
					</nav>
				</div>
			</header>
			<DrawerMenu isOpen={isMenuOpen} position="left" width="w-full">
				<ul>
					<li className="border-b border-border py-4 px-3">
						<Link
							href="/products"
							onClick={() => setIsMenuOpen(false)}
						>
							Products
						</Link>
					</li>
					<li className="border-b border-border py-4 px-3">
						<Link
							href="/about"
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</Link>
					</li>
					<li className="border-b border-border py-4 px-3">
						<Link
							href="/contact"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact
						</Link>
					</li>
				</ul>
			</DrawerMenu>
		</>
	);
}
