import { CartItem, Product } from "@prisma/client";

export type CartWithProductIncluded = CartItem & {
	product: Product;
};
