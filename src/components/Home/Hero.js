"use client";

import Image from "next/image";

export default function Hero({
	heroContainerRef,
	vantaRef,
	h1Ref,
	letterIRef,
	subtitleRef,
	originBgRef,
	originOverlayRef,
	originContentRef,
}) {
	return (
		<section id="origin" ref={heroContainerRef} className="relative h-[200vh] z-30">
			<div className="sticky top-0 h-screen overflow-hidden">
				<div ref={vantaRef} className="absolute inset-0 z-0" />

				<div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
					<h1
						ref={h1Ref}
						className="text-[15vw] font-black uppercase leading-none tracking-tighter flex text-[#DCD7D3] will-change-transform"
					>
						<span>S</span>
						<span>U</span>
						<span>F</span>
						<span ref={letterIRef}>I</span>
						<span>A</span>
						<span>N</span>
					</h1>
					<p
						ref={subtitleRef}
						className="font-mono tracking-[1em] opacity-60 text-[#DCD7D3] mt-4 will-change-opacity"
					>
						Full-Stack Architect
					</p>
				</div>

				<div
					ref={originBgRef}
					className="absolute inset-0 z-[15] bg-[#DCD7D3] opacity-0 pointer-events-none will-change-opacity"
				/>

				<div
					ref={originOverlayRef}
					className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none text-[#252423] will-change-opacity overflow-hidden"
				>
					<div
						ref={originContentRef}
						className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 md:px-10 scale-75 will-change-transform"
					>
						<div className="magnetic-target relative w-48 h-48 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-[#252423]/10 flex-shrink-0">
							<Image
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAd2RvRrCj7i4U6QgpVpy1gFmYC0MnggsJbddxo6nlh7zrMQ7PymfZAN6XJe-xRS3esUm90G2tCuBc_tclWv25fZT40uu5rONxPvjgT554f1GEOZy5SuaEolqW61jO0eCQ0XsrABtQi3pDaNtB9bFt8RGkCTLJZCBAkYc4xvJh1P7g8pc_lpMUJXRPMLtN3kumskpOhdWPS2NsZOfKoc2nlXRvFp04lgbyGbRanQ_3oiGUOw5-cUB1oVgaeBRcSY91wtkOENcdljLZ"
								alt="Sufian"
								fill
								sizes="(max-width: 768px) 16rem, 24rem"
								className="object-cover"
							/>
						</div>
						<div className="flex-1 space-y-4 md:space-y-8 text-center md:text-left">
							<h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
								The Origin
							</h2>
							<div className="space-y-4 md:space-y-6 text-lg md:text-2xl leading-relaxed font-medium opacity-90 text-[#252423]">
								<p>
									I am a dedicated software engineer with a strong academic
									foundation from **The Islamia University of Bahawalpur
									(IUB)**. My journey began with a curiosity for how data flows
									through the wires, which quickly evolved into a passion for
									the full JavaScript ecosystem.
								</p>
								<p>
									My approach combines the structural integrity of engineering
									with the creative flair of a designer. I don&apos;t just write
									code; I sketch out digital systems that are intuitive,
									performant, and delightful to use.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
