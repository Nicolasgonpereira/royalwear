"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function GalleryCarousel({ images }: { images: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div>
			<div className="relative w-full h-full">
				<div className="flex w-full h-full justify-center">
					<Image
						src={images[currentIndex]}
						width={400}
						height={400}
						alt={`Slide ${currentIndex + 1}`}
						className="md:max-w-[75vw] md:h-auto rounded-md transition ease-in-out dalay-100 duration-500"
					/>
				</div>

				{/* Navigation Arrows */}
				<div
					className={`relative bottom-1 left-1/2 -translate-y-full -translate-x-1/2 flex justify-center items-center gap-1 bg-muted w-fit px-2 rounded-2xl ${images.length === 1 && "hidden"}`}
				>
					<button onClick={prevSlide} className="p-2 shadow-md">
						<FaArrowLeft />
					</button>
					{/* Dots */}
					<div className="flex justify-center gap-2 items-center">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									currentIndex === index
										? "bg-white"
										: "bg-white/50"
								}`}
							/>
						))}
					</div>
					{/* Navigation Arrows */}
					<button onClick={nextSlide} className="p-2 shadow-md">
						<FaArrowRight />
					</button>
				</div>
			</div>
		</div>
	);
}

export function WebGalleryCarousel() {
	const webImages = [
		"https://picsum.photos/1200/800?random=1",
		"https://picsum.photos/1200/800?random=2",
		"https://picsum.photos/1200/800?random=3",
		"https://picsum.photos/1200/800?random=4",
		"https://picsum.photos/1200/800?random=5",
		"https://picsum.photos/1200/800?random=6",
		"https://picsum.photos/1200/800?random=7"
	];

	return (
		<div className="w-full">
			<GalleryCarousel images={webImages} />
		</div>
	);
}
