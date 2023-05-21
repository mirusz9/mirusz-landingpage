import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';

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

const root = document.getElementById('root')!;
function App() {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 + 400 });
	const [hue, setHue] = useState(40);
	const [scroll, setScroll] = useState(0);

	document.documentElement.style.setProperty('--primaryHue', hue.toString());

	const isBackgroundVisible = scroll / dimensions.height < 0.9;

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
			if (isBackgroundVisible) {
				setMousePos({ x: e.clientX, y: e.clientY });
			}
		}, 20);

		const throttledScroll = throttle(() => {
			setScroll(root.scrollTop);
		}, 0);

		window.addEventListener('resize', debouncedHandleResize);
		window.addEventListener('mousemove', throttledHandleMouseMove);
		window.addEventListener('mousedown', mouseClick);

		root.addEventListener('scroll', throttledScroll);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
			window.removeEventListener('mousemove', throttledHandleMouseMove);
			window.removeEventListener('mousedown', mouseClick);
			root.removeEventListener('scroll', throttledScroll);
		};
	}, [isBackgroundVisible]);

	const getMouseAndDepthTransform = (depth: number) => {
		if (!isBackgroundVisible) return '';
		// depth of 0 is infinitely far away, depth of 10 is level with the foreground
		const sensitivity = depth * 5;
		const ds = scroll * (1 - depth / 10);
		const dx = mousePos.x - window.innerWidth / 2;
		const dy = mousePos.y - window.innerHeight / 2;
		const px = (dx / 1000) * sensitivity * depth;
		const py = (dy / 1000) * sensitivity * depth + ds;
		// const rx = (mousePos.x * 2 / window.innerWidth - 1) * amount / 200;
		// const ry = -(mousePos.y * 2 / window.innerHeight - 1) * amount / 200;
		return `translateX(${px}px) translateY(${py}px`; // rotateX(${ry}deg) rotateY(${rx}deg)`
	};

	const getBackgroundSquares = () => {
		// -20 is neccessary to account for margin
		const width = dimensions.width - 20;
		const height = dimensions.height - 20;
		const desiredWidth = Math.floor(Math.sqrt(width + 100) * 4);
		const squareWidthIncludingMargin = desiredWidth + (width % desiredWidth) / Math.floor(width / desiredWidth) - 0.1;
		const numOfSquaresInARow = Math.round(width / squareWidthIncludingMargin);
		const numOfRows = Math.ceil(height / squareWidthIncludingMargin);
		const squareWidthToMarginRatio = 0.85;
		return Array.from({ length: numOfRows }).map((_, i) => {
			return (
				<div className="row" key={i}>
					{Array.from({ length: numOfSquaresInARow }).map((_, j) => (
						<div
							className="square"
							key={j}
							style={{
								width: `${squareWidthIncludingMargin * squareWidthToMarginRatio}px`,
								margin: `${(squareWidthIncludingMargin * (1 - squareWidthToMarginRatio)) / 2}px`,
								// transform: getParallaxTransform(10),
							}}
						></div>
					))}
				</div>
			);
		});
	};

	return (
		<>
			<div id="background" style={{ transform: getMouseAndDepthTransform(2) }}>
				{getBackgroundSquares()}
			</div>
			<div id="titleContainer">
				<h1 style={{ transform: getMouseAndDepthTransform(6) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(6.5) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(7) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(7.5) }}>mirusz</h1>
			</div>
			<Header />
			<Content scroll={scroll} />
		</>
	);
}

export default App;
