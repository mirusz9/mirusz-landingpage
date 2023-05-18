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

	useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}, 200);

		window.addEventListener('resize', debouncedHandleResize);

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
		return Array.from({ length: numOfSquares }).map(() => (
			<div
				className="square"
				style={{
					width: `${squareWidthIncludingMargin * squareWidthToMarginRatio}px`,
					margin: `${(squareWidthIncludingMargin * (1 - squareWidthToMarginRatio)) / 2}px`,
				}}
			></div>
		));
	};

	return (
		<>
			<header>
				<h4>mirusz9</h4>
			</header>
			<div id="background">{getBackgroundSquares()}</div>
		</>
	);
}

export default App;
