"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs";
import SufianLogo from "./LogoSvg";

export default function WelcomeLoader() {
	const [visible, setVisible] = useState(true);
	const overlayRef = useRef(null);
	const logoRef = useRef(null);

	useEffect(() => {
		if (!overlayRef.current || !logoRef.current) return;

		let didFinish = false;

		const finish = () => {
			if (didFinish) return;
			didFinish = true;
			document.body.style.overflow = "auto";
			setVisible(false);
		};

		document.body.style.overflow = "hidden";

		const timeline = createTimeline({
			autoplay: true,
			onComplete: finish,
		});

		timeline
			.add(logoRef.current, {
				opacity: [0, 1],
				scale: [0.85, 1],
				duration: 650,
				ease: "outExpo",
			})
			.add(logoRef.current, {
				scale: [1, 8],
				opacity: [1, 0],
				duration: 1200,
				ease: "inOutQuart",
			}, "+=180")
			.add(overlayRef.current, {
				opacity: [1, 0],
				duration: 450,
				ease: "linear",
			}, "-=260");

		timeline.play();

		const failSafeTimeout = window.setTimeout(finish, 3800);

		return () => {
			window.clearTimeout(failSafeTimeout);
			timeline?.pause?.();
			document.body.style.overflow = "auto";
		};
	}, []);

	if (!visible) return null;

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#323130] pointer-events-none"
		>
			<div ref={logoRef} className="will-change-transform">
				<SufianLogo size={120} />
			</div>
		</div>
	);
}
