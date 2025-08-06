import { useRef, useState, useEffect } from 'react';
import schedulePlannerImg from './assets/scheduleplanner.png';
import virusSimulationImg from './assets/virussimulation.png';
import himcmImg from './assets/himcm.png';
import vlawImg from './assets/vlaw.png';
import ropesimImg from './assets/rope-sim.png';
import fabrikImg from './assets/fabrik.png';
import gameImg from './assets/2dgame.png';
import smtImg from './assets/smt.png';
import { FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
import { FaGithubSquare } from 'react-icons/fa';
import { FaSpotify } from 'react-icons/fa';
import { FaDiceSix } from 'react-icons/fa';
import './content.css';

interface IContentProps {
	scroll: number;
	randomizeCol: () => void;
}

function Content({ scroll, randomizeCol }: IContentProps) {
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
			const middle = rect.top + rect.height / 2 + document.documentElement.scrollTop - 55;
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
		window.scrollTo({
			behavior: 'smooth',
			top: top + document.documentElement.scrollTop - 55,
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
						Skills Management
					</button>
					<button onClick={(e) => scrollToIndex(e, 3)} className="secondary">
						Schedule Planner
					</button>
					<button onClick={(e) => scrollToIndex(e, 4)} className="secondary">
						Virus Simulation
					</button>
					<button onClick={(e) => scrollToIndex(e, 5)} className="secondary">
						HiMCM
					</button>
					<button onClick={(e) => scrollToIndex(e, 6)} className="secondary">
						Videki Law
					</button>
					<button onClick={(e) => scrollToIndex(e, 7)} className="secondary">
						2D Game
					</button>
					<button onClick={(e) => scrollToIndex(e, 8)} className="secondary">
						Rope Simulation
					</button>
					<button onClick={(e) => scrollToIndex(e, 9)} className="secondary">
						FABRIK
					</button>
					<button onClick={(e) => scrollToIndex(e, 10)}>Contact</button>
				</div>
			</div>
			<div id="right">
				<div className="header">
					<h5>Try other colors: </h5>
					<button onClick={randomizeCol} id="randomizeButton">
						<FaDiceSix size="30px" />
					</button>
				</div>
				<div id="rightContentWrapper">
					<div id="rightContent" ref={rightContentRef}>
						<section>
							<div>
								<h2>About Me</h2>
							</div>
							<p>
								Hi, my name is Adam Sztano, a.k.a. <span className="monospace">mirusz9</span>.
							</p>
							<p>
								I study Computer Science and Engineering at{' '}
								<a href="https://tudelft.nl" target="_blank">
									TU Delft
								</a>
								. I've been developing projects for fun since 2017, when I first learned to code. Below
								you'll find a showcase of my technical projects and achievements.
							</p>
						</section>
						<section>
							<div>
								<h2>Projects</h2>
							</div>
							<p>
								Here are the highlights of my software development projects. Most of these projects
								(along with additional work not featured here) are available on my{' '}
								<a href="https://github.com/mirusz9" target="_blank">
									GitHub
								</a>
								.
							</p>
						</section>
						<section className="secondary">
							<div>
								<h2>Skills Management Tool</h2>
								<span className="date"># 06/2025</span>
							</div>
							<p>
								Developed for the Dutch Ministry of Defence, this project is a comprehensive skill
								management system built with Next.js 15 and Express.js, designed to track and develop
								employee competencies across the organization. The application features hierarchical
								skill tree management, interactive spider web charts for skill visualization, and
								role-based access control with LDAP integration.
							</p>
							<a className="image">
								<img src={smtImg} alt="Skills Management Tool" loading="lazy" />
							</a>
							<p>
								The system includes advanced features such as real-time data visualization using D3.js,
								testing with 100% code coverage, and a modular component architecture with Storybook
								documentation. Key functionalities include team management capabilities, feedback
								systems for manager-employee communication, advanced search functionality, and
								responsive design with full accessibility support including keyboard navigation
								throughout the interface.
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
								Recognizing the complexity of the IB and AP academic systems, I identified a significant
								challenge faced by students and families navigating these programs. The extensive
								documentation and complex requirements often overwhelmed students during course
								selection. To address this, I developed a comprehensive schedule planning tool for my
								school that simplifies the AP, IB, and credit systems, clearly outlines graduation
								requirements, and provides prerequisite information for all courses.
							</p>
							<a href="https://ashschedule.mirusz9.com" target="_blank" className="image">
								<img src={schedulePlannerImg} alt="Schedule Planner" loading="lazy"></img>
							</a>
							<p>
								This project represents one of my most significant undertakings so far, requiring six
								months of development and over a hundred hours of dedicated work. Due to the nature of
								the content, the source code remains private.
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
								<img src={virusSimulationImg} alt="Virus Simulation" loading="lazy"></img>
							</a>
							<p>
								This project was inspired by{' '}
								<a href="https://www.youtube.com/watch?v=gxAaO2rsdIs" target="_blank">
									3Blue1Brown's video
								</a>{' '}
								on YouTube. It is based on an SIR model that can be customized with many settings such
								as the rate of spread of the virus, the percentage of the population following social
								distancing rules, or the duration for which a cell is infectious.
							</p>
							<p>
								If you'd like to try the simulation out, the installation and the settings are
								well-documented on the GitHub page in <span className="monospace">README.md</span>.
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
								Three classmates and I collaborated to compete in the High School Mathematical Contest
								in Modeling, developing a mathematical model to predict bee colony population dynamics
								over time. Our comprehensive twenty-four page research paper earned an Honorable Mention
								award.
							</p>
							<a href="https://himcm.mirusz9.com" target="_blank" className="image">
								<img src={himcmImg} alt="HiMCM" loading="lazy"></img>
							</a>
							<p>
								You can try the{' '}
								<a href="https://himcm.mirusz9.com" target="_blank">
									simulation
								</a>
								here.
							</p>
						</section>
						<section className="secondary">
							<div>
								<h2>Videki Law</h2>
								<span className="date"># 13/05/2021</span>
							</div>
							<p>
								Videki Law is a case management system designed for legal professionals to efficiently
								track ongoing cases, manage client relationships, and organize legal documentation.
							</p>
							<a className="image" href="https://vlaw.mirusz9.com">
								<img src={vlawImg} alt="A screenshot of Videki Law" loading="lazy" />
							</a>
							<p>
								Unfortunately I can't include detailed screenshots as all the information is
								confidential, but I can proudly say that this has been one of the biggest projects I've
								ever worked on.
							</p>
						</section>
						<section className="secondary">
							<div>
								<h2>2D Game</h2>
								<span className="date"># 09/06/2020</span>
							</div>
							<p>
								I developed a 2D sidescroller game similar to Terraria, building everything{' '}
								<i>from scratch</i>. This project was driven by my fascination with procedural world
								generation algorithms and my curiosity about how games like Minecraft and Terraria
								create their expansive and diverse environments.
							</p>
							<p>
								The map generator procedurally creates interconnected cave systems designed for realism.
								All components were developed from scratch, including custom textures, physics and
								collision systems, rendering engine, and world generation algorithms.
							</p>
							<a className="image" href="https://github.com/mirusz9/2d-game" target="_blank">
								<img src={gameImg} alt="A screenshot of the game" loading="lazy" />
							</a>
							<p>
								This project gratly enhanced my programming capabilities and provided valuable
								experience in game development fundamentals. While still in development, you can{' '}
								<a href="https://github.com/mirusz9/2d-game" target="_blank">
									explore the current build here
								</a>
								.
							</p>
						</section>
						<section className="secondary">
							<div>
								<h2>Rope Simulation</h2>
								<span className="date"># 10/06/2022</span>
							</div>
							<p>
								This physics simulation project models rope and cloth-like materials by connecting nodes
								with rigid constraints and applying fundamental physics principles. The implementation
								achieves remarkably realistic material behavior and dynamics.
							</p>
							<a className="image" href="https://github.com/mirusz9/rope-simulation" target="_blank">
								<img src={ropesimImg} alt="A screenshot of the rope simulation" loading="lazy" />
							</a>
							<p>
								You can play with the simulation by downloading the two files from{' '}
								<a href="https://github.com/mirusz9/rope-simulation" target="_blank">
									my GitHub repository
								</a>
								. The project includes a basic editor for creating custom rope structures and
								configurations.
							</p>
						</section>
						<section className="secondary">
							<div>
								<h2>FABRIK</h2>
								<span className="date"># 09/06/2022</span>
							</div>
							<p>
								I was interested in inverse kinematics, so I implemented FABRIK (Forward and backward
								reaching inverse kinematics). This is a very simple fun app that demonstrates how
								inverse kinematics work.
							</p>
							<a className="image" href="https://github.com/mirusz9/FABRIK" target="_blank">
								<img src={fabrikImg} alt="A screenshot of the inverse kinematics app" loading="lazy" />
							</a>
							<p>
								The interactive demonstration is{' '}
								<a href="https://github.com/mirusz9/FABRIK" target="_blank">
									available here
								</a>
								. The codebase supports customization of parameters such as node count and segment
								length for experimentation.
							</p>
						</section>

						<section id="contact">
							<div>
								<h2>Contact</h2>
							</div>
							<p>
								Feel free to connect with me through any of the platforms below. You can find me as{' '}
								<span className="monospace">mirusz9</span> across all platforms:
							</p>
							<ul id="contactList">
								<li>
									<a href="https://www.instagram.com/mirusz9/" target="_blank">
										<FaSquareInstagram size="25px" />
										<span>Instagram</span>
									</a>
								</li>
								{/* <li>
									<a href="https://x.com/mirusz9" target="_blank">
										<FaSquareXTwitter size="25px" />
										<span>X</span>
									</a>
								</li> */}
								<li>
									<a href="https://www.linkedin.com/in/mirusz9" target="_blank">
										<FaLinkedin size="25px" />
										<span>LinkedIn</span>
									</a>
								</li>
								<li>
									<a href="https://github.com/mirusz9" target="_blank">
										<FaGithubSquare size="25px" />
										<span>GitHub</span>
									</a>
								</li>
								<li>
									<a href="https://open.spotify.com/user/mirusz9" target="_blank">
										<FaSpotify size="25px" />
										<span>Spotify</span>
									</a>
								</li>
							</ul>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Content;
