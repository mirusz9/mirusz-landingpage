import { useEffect, useState } from 'react';
import './App.css';

function debounce(fn: () => void, ms: number) {
	let timer: number | undefined;

	return () => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			timer = undefined;

			fn();
		}, ms);
	};
}

function App() {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

	useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}, 20);

		window.addEventListener('resize', debouncedHandleResize);
		window.addEventListener('mousemove', (e) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		});

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
		};
	});

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
    const px = dx / 1000 * amount;
    const py = dy / 1000 * amount;
    // const rx = (mousePos.x * 2 / window.innerWidth - 1) * amount / 200;
    // const ry = -(mousePos.y * 2 / window.innerHeight - 1) * amount / 200;
    return `translateX(${px}px) translateY(${py}px)`// rotateX(${ry}deg) rotateY(${rx}deg)`
  }

	return (
		<>
			<header>
				<h4>mirusz9</h4>
			</header>
			<div id="background" style={{transform: getParallaxTransform(10)}}>{getBackgroundSquares()}</div>
			<div id="titleContainer">
				<h1 style={{transform: getParallaxTransform(110)}}>mirusz</h1>
				<h1 style={{transform: getParallaxTransform(130)}}>mirusz</h1>
				<h1 style={{transform: getParallaxTransform(150)}}>mirusz</h1>
				<h1 style={{transform: getParallaxTransform(170)}}>mirusz</h1>
			</div>
		</>
	);
}

export default App;
