"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/cartContext";

export default function CartPage() {
	const { cart, updateItemQuantity, removeItemFromCart } = useCart();

	const calculateTotal = () => {
		return cart.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	};

	return (
		<main className="max-w-4xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
			<div className="bg-white rounded-lg shadow-md p-6 text-black">
				{cart.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<>
						{cart.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between py-4 border-b"
							>
								<div className="flex items-top">
									<Link href={`/products/${item.product.id}`}>
										<Image
											src={item.product.images[0]}
											alt={item.product.name}
											width={300}
											height={300}
											className="w-20 h-20 object-cover rounded"
										/>
									</Link>
									<div className="ml-4">
										<Link
											href={`/products/${item.product.id}`}
											className="font-semibold"
										>
											{item.product.name}
										</Link>
										<p>Stock: {item.product.stock}</p>
										<p>${item.product.price}</p>
									</div>
								</div>
								<div className="flex items-center">
									<input
										type="number"
										value={item.quantity}
										onChange={(e) =>
											updateItemQuantity(
												item.id,
												parseInt(e.target.value)
											)
										}
										className="text-black w-10 px-2 py-1 border border-border rounded mr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
										min="1"
									/>
									<button
										onClick={() =>
											removeItemFromCart(item.id)
										}
										className="text-red-500 hover:text-red-700"
									>
										Remove
									</button>
								</div>
							</div>
						))}
						<div className="mt-6 flex justify-between items-center">
							<div>
								<p className="text-lg font-semibold">
									Total:{" "}
									{new Intl.NumberFormat("eng", {
										style: "currency",
										currency: "USD"
									}).format(calculateTotal())}
								</p>
							</div>
							<button className="bg-primary text-primaryForeground px-6 py-2 rounded hover:bg-primary">
								Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
