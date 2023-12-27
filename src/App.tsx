import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import { checkIsMobile, debounce, throttle } from './utils';
import Footer from './Footer';

const metaThemeColor = document.getElementById('meta-theme-color');
function App() {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	const isMobile = checkIsMobile();
	const initialMousePos = { x: window.innerWidth / 2 - (isMobile ? 0 : 400), y: window.innerHeight / 2 + (isMobile ? 200 : 400) };
	const [mousePos, setMousePos] = useState(initialMousePos);
	const [hue, setHue] = useState(40);
	const [scroll, setScroll] = useState(0);

	document.documentElement.style.setProperty('--primaryHue', hue.toString());
	metaThemeColor?.setAttribute('content', `hsl(${hue}, 5%, 10%)`);

	const isBackgroundVisible = scroll / dimensions.height < 0.9;

	const randomizeCol = () => {
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
			if (isBackgroundVisible && !isMobile) {
				setMousePos({ x: e.clientX, y: e.clientY });
			}
		}, 16);

		const throttledScroll = () => {
			setScroll(document.documentElement.scrollTop);
		};

		window.addEventListener('resize', debouncedHandleResize);
		window.addEventListener('mousemove', throttledHandleMouseMove);
		window.addEventListener('scroll', throttledScroll);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
			window.removeEventListener('mousemove', throttledHandleMouseMove);
			window.removeEventListener('scroll', throttledScroll);
		};
	}, [isBackgroundVisible, isMobile]);

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
			<Header />
			<div id="titleContainer">
				<h1 style={{ transform: getMouseAndDepthTransform(6) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(6.5) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(7) }}>mirusz</h1>
				<h1 style={{ transform: getMouseAndDepthTransform(7.5) }}>mirusz</h1>
			</div>
			<Content scroll={scroll} randomizeCol={randomizeCol}/>
			<Footer />
		</>
	);
}

export default App;
