import { useRef, useState, useEffect } from 'react';
import schedulePlannerImg from './assets/scheduleplanner.png';
import virusSimulationImg from './assets/virussimulation.png';
import himcmImg from './assets/himcm.png';
import './content.css';

const root = document.querySelector('body')!;

interface IContentProps {
	scroll: number;
}

function Content({ scroll }: IContentProps) {
	const rightContentRef = useRef<HTMLDivElement>(null);
	const leftContentRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const rightNode = rightContentRef.current;
		const leftNode = leftContentRef.current;
		if (!rightNode || !leftNode) return;

		const sections = rightNode.querySelectorAll('section');

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const rect = section.getBoundingClientRect();
			const middle = rect.top + rect.height / 2 + root.scrollTop - 55;
			if (scroll < middle) {
				if (i == activeIndex) return;

				const buttons = leftNode.querySelectorAll('button');

				setActiveIndex((prev) => {
					buttons[prev].classList.remove('active');
					buttons[i].classList.add('active');
					return i;
				});
				break;
			}
		}
	}, [scroll, activeIndex]);

	const scrollToIndex = (e: React.MouseEvent, index: number) => {
		e.preventDefault();

		const rightNode = rightContentRef.current;
		const leftNode = leftContentRef.current;

		if (!rightNode || !leftNode) return;

		const sectionNode = rightNode.querySelectorAll('section')[index];
		const buttons = leftNode.querySelectorAll('button');

		setActiveIndex((prev) => {
			buttons[prev].classList.remove('active');
			buttons[index].classList.add('active');
			return index;
		});

		const top = sectionNode.getBoundingClientRect().top;
		root.scrollTo({
			behavior: 'smooth',
			top: top + root.scrollTop - 55,
		});
	};

	return (
		<main>
			<div id="left">
				<div id="leftContent" ref={leftContentRef}>
					<div className="header">
						<h5>mirusz9.com</h5>
					</div>
					<button onClick={(e) => scrollToIndex(e, 0)} className="active">
						About Me
					</button>
					<button onClick={(e) => scrollToIndex(e, 1)}>Projects</button>
					<button onClick={(e) => scrollToIndex(e, 2)} className="secondary">
						Schedule Planner
					</button>
					<button onClick={(e) => scrollToIndex(e, 3)} className="secondary">
						Virus Simulation
					</button>
					<button onClick={(e) => scrollToIndex(e, 4)} className="secondary">
						HiMCM
					</button>
					<button onClick={(e) => scrollToIndex(e, 5)} className="secondary">
						Videki Law
					</button>
					<button onClick={(e) => scrollToIndex(e, 6)} className="secondary">
						Rope Simulation
					</button>
					<button onClick={(e) => scrollToIndex(e, 7)} className="secondary">
						FABRIK
					</button>
					<button onClick={(e) => scrollToIndex(e, 8)} className="secondary">
						2D Game
					</button>
					<button onClick={(e) => scrollToIndex(e, 9)}>Contact</button>
				</div>
			</div>
			<div id="right">
				<div id="rightContent" ref={rightContentRef}>
					<div className="header">
						<h5>Idk what goes here yet</h5>
					</div>
					<section>
						<h2>About Me</h2>
						<p>
							Hi, I am <span className="monospace">mirusz9</span>.
						</p>
						<p>
							I've been making stuff for fun since 2017, when I learned how to code. If you want to check out my projects, you
							can take a look at them below.
						</p>
					</section>
					<section>
						<h2>Projects</h2>
						<p>
							Here are the highlights of my many coding projects. Note that all of these (and many more projects that I did
							not include on this website) are available on my{' '}
							<a href="https://github.com/mirusz9" target="_blank">
								GitHub
							</a>
							.
						</p>
					</section>
					<section className="secondary">
						<div>
							<h2>Schedule Planner</h2>
							<span className="date"># 12/02/2022</span>
						</div>
						<p>
							A{' '}
							<a href="https://ashschedule.mirusz9.com" target="_blank">
								Schedule Builder
							</a>{' '}
							tool for my high school.
						</p>
						<p>
							Understanding the IB and AP systems was a real challenge for me as our family had no previous experience with
							these programs. We had to figure out all the requirements from a 100-page document. As this process was
							overwhelming for many students, I came up with the idea to create a schedule planner for my school. This website
							aimed to explain how the AP, IB, and credit systems work, what classes one needs to graduate, and the
							prerequisites for any given course.
						</p>
						<a href="https://ashschedule.mirusz9.com" target="_blank" className="image">
							<img src={schedulePlannerImg} alt="Schedule Planner"></img>
						</a>
						<p>
							This was one of the biggest projects I've ever worked on, taking up half a year and over a hundred hours of
							work. Because of this, I keep the source code private. <span className="small">I'm sorry :(</span>
						</p>
					</section>
					<section className="secondary">
						<div>
							<h2>Virus Simulation</h2>
							<span className="date"># 04/06/2020</span>
						</div>
						<p>
							A highly customizable simulation that models and visualizes the spread of a virus. The{' '}
							<a href="https://github.com/mirusz9/Virus-Simulation" target="_blank">
								source code
							</a>{' '}
							is available on my GitHub.
						</p>
						<a href="https://github.com/mirusz9/Virus-Simulation" target="_blank" className="image">
							<img src={virusSimulationImg} alt="Virus Simulation"></img>
						</a>
						<p>
							This project was inspired by{' '}
							<a href="https://www.youtube.com/watch?v=gxAaO2rsdIs" target="_blank">
								3Blue1Brown's video
							</a>{' '}
							on YouTube. It is based on an SIR model that can be customized with many settings such as the rate of spread of
							the virus, the percentage of the population following social distancing rules, or the duration for which a cell
							is infectious.
						</p>
						<p>
							If you'd like to try the simulation out, the installation and the settings are well-documented on the GitHub
							page in <span className="monospace">README.md</span>.
						</p>
					</section>
					<section className="secondary">
						<div>
							<h2>HiMCM</h2>
							<span className="date"># 14/11/2022</span>
						</div>
						<p>
							<a
								href="https://www.contest.comap.com/highschool/contests/himcm/2022_Problems/2022_HiMCM_Problem_A.pdf"
								target="_blank"
							>
								2022 Problem A
							</a>
							: The Need for Bees (and not just for honey)
						</p>
						<p>
							Me and three of my classmates partnered up to compete in the High School Mathematical Contest in Modeling, where
							we had to create a model that reflects the population size of a bee colony over time. The twenty-four page paper we wrote earned Honorable Mention.  
						</p>
						<a href="https://himcm.mirusz9.com" target="_blank" className="image">
							<img src={himcmImg} alt="HiMCM"></img>
						</a>
						<p>
							You can try the simulation{' '}
							<a href="https://himcm.mirusz9.com" target="_blank">
								here
							</a>.
							
						</p>
			
					</section>
					<section id="contact">
						<h2>Contact</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, magnam ab illum dolore ullam nostrum
							aliquam totam maxime esse autem cupiditate optio exercitationem asperiores neque suscipit repudiandae voluptatem
							omnis nihil.
							<br />
							<br />
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam facilis aliquam, aut porro optio voluptatum
							beatae reiciendis necessitatibus modi quae ea? Eius quaerat atque soluta rerum saepe voluptatibus perspiciatis
							optio.
							<br />
							<br />
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam facilis aliquam, aut porro optio voluptatum
							beatae reiciendis necessitatibus modi quae ea? Eius quaerat atque soluta rerum saepe voluptatibus perspiciatis
							optio.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}

export default Content;
