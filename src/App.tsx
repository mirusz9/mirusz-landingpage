import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';

function debounce<T>(fn: (e: T) => void, ms: number) {
	let timer: NodeJS.Timeout | undefined;

	return (e: T) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			timer = undefined;

			fn(e);
		}, ms);
	};
}

function throttle<T>(fn: (e: T) => void, ms: number) {
	let shouldWait = false;
	return (e: T) => {
		if (!shouldWait) {
			fn(e);

			shouldWait = true;
			setTimeout(() => {
				shouldWait = false;
			}, ms);
		}
	};
}
function App() {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 + 400 });
	const [hue, setHue] = useState(40);

	document.documentElement.style.setProperty('--primaryHue', hue.toString());

	const mouseClick = () => {
		setHue(Math.floor(Math.random() * 360));
	};

	useEffect(() => {
		const debouncedHandleResize = debounce(() => {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}, 20);

		const throttledHandleMouseMove = throttle<MouseEvent>((e) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		}, 20);

		window.addEventListener('resize', debouncedHandleResize);
		window.addEventListener('mousemove', throttledHandleMouseMove);
		window.addEventListener('mousedown', mouseClick);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
			window.removeEventListener('mousemove', throttledHandleMouseMove);
			window.removeEventListener('mousedown', mouseClick);
		};
	}, []);

	const getBackgroundSquares = () => {
		// -20 is neccessary to account for margin
		const width = dimensions.width - 20;
		const height = dimensions.height - 20;
		const desiredWidth = Math.floor(Math.sqrt(width + 100) * 4);
		const squareWidthIncludingMargin = desiredWidth + (width % desiredWidth) / Math.floor(width / desiredWidth) - 0.1;
		const numOfSquaresInARow = Math.round(width / squareWidthIncludingMargin);
		const numOfSquares = numOfSquaresInARow * Math.ceil(height / squareWidthIncludingMargin);

		const squareWidthToMarginRatio = 0.85;
		return Array.from({ length: numOfSquares }).map((_, i) => (
			<div
				className="square"
				key={i}
				style={{
					width: `${squareWidthIncludingMargin * squareWidthToMarginRatio}px`,
					margin: `${(squareWidthIncludingMargin * (1 - squareWidthToMarginRatio)) / 2}px`,
				}}
			></div>
		));
	};

	const getParallaxTransform = (amount: number) => {
		const dx = mousePos.x - window.innerWidth / 2;
		const dy = mousePos.y - window.innerHeight / 2;
		const px = (dx / 1000) * amount;
		const py = (dy / 1000) * amount;
		// const rx = (mousePos.x * 2 / window.innerWidth - 1) * amount / 200;
		// const ry = -(mousePos.y * 2 / window.innerHeight - 1) * amount / 200;
		return `translateX(${px}px) translateY(${py}px)`; // rotateX(${ry}deg) rotateY(${rx}deg)`
	};

	return (
		<>
			<Header />
			<div id="background" style={{ transform: getParallaxTransform(10) }}>
				{getBackgroundSquares()}
			</div>
			<div id="titleContainer">
				<h1 style={{ transform: getParallaxTransform(110) }}>mirusz</h1>
				<h1 style={{ transform: getParallaxTransform(130) }}>mirusz</h1>
				<h1 style={{ transform: getParallaxTransform(150) }}>mirusz</h1>
				<h1 style={{ transform: getParallaxTransform(170) }}>mirusz</h1>
			</div>
		</>
	);
}

export default App;
