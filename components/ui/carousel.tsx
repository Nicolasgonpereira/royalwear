"use client";
import { Product } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import CarouselProductCard from "../carouselCard";

interface CarouselProps {
	title: string;
	cards: Product[];
}

export default function Carousel({ title, cards }: CarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);

	const handleScroll = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				carouselRef.current;
			setIsAtStart(scrollLeft === 0);
			setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
		}
	};

	const handlePrevClick = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({
				left: -carouselRef.current.clientWidth / 2,
				behavior: "smooth"
			});
		}
	};

	const handleNextClick = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({
				left: carouselRef.current.clientWidth / 2,
				behavior: "smooth"
			});
		}
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const carousel = carouselRef.current;
		if (carousel) {
			carousel.style.userSelect = "none";
			const startX = e.pageX - carousel.offsetLeft;
			const scrollLeft = carousel.scrollLeft;

			const onMouseMove = (e: MouseEvent) => {
				const x = e.pageX - carousel.offsetLeft;
				const walk = (x - startX) * 2;
				carousel.scrollLeft = scrollLeft - walk;
			};

			const onMouseUp = () => {
				carousel.style.removeProperty("user-select");
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mouseup", onMouseUp);
			};

			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		}
	};

	useEffect(() => {
		handleScroll();
	}, []);

	return (
		<div className="carousel-container p-4 relative">
			<div className="flex flex-row items-center justify-between mb-4">
				<h2 className="text-2xl font-bold">{title}</h2>
				<div className="hidden md:flex space-x-2 ">
					<button
						onClick={handlePrevClick}
						className={`bg-secondary text-secondaryForeground p-2 rounded-full ${isAtStart ? "opacity-20" : "opacity-100"}`}
						disabled={isAtStart}
					>
						&lt;
					</button>
					<button
						onClick={handleNextClick}
						className={`bg-secondary text-secondaryForeground p-2 rounded-full ${isAtEnd ? "opacity-20" : "opacity-100"}`}
						disabled={isAtEnd}
					>
						&gt;
					</button>
				</div>
			</div>
			<div
				ref={carouselRef}
				className="flex overflow-x-auto gap-4 cursor-pointer md:overflow-hidden"
				onScroll={handleScroll}
				onMouseDown={handleMouseDown}
			>
				{cards.map((card) => (
					<CarouselProductCard key={card.id} product={card} />
				))}
			</div>
		</div>
	);
}
