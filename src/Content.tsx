import { useRef, useState, useEffect } from 'react';
import './content.css';

const root = document.getElementById('root')!;

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
					<button onClick={(e) => scrollToIndex(e, 2)}>Github</button>
					<button onClick={(e) => scrollToIndex(e, 3)}>Contact</button>
				</div>
			</div>
			<div id="right">
				<div id="rightContent" ref={rightContentRef}>
					<div className="header">
						<h5>Idk what goes here yet</h5>
					</div>
					<section id="about-me">
						<h2>About Me</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, magnam ab illum dolore ullam nostrum
							aliquam totam maxime esse autem cupiditate optio exercitationem asperiores neque suscipit repudiandae voluptatem
							omnis nihil.
						</p>
					</section>
					<section id="projects">
						<h2>Projects</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, magnam ab illum dolore ullam nostrum
							aliquam totam maxime esse autem cupiditate optio exercitationem asperiores neque suscipit repudiandae voluptatem
							omnis nihil.
							<br />
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ullam quam quis in rerum autem a illo obcaecati,
							blanditiis voluptatum doloremque provident deleniti repellat nostrum ea hic modi odit ipsum! Lorem ipsum dolor
							sit amet consectetur, adipisicing elit. Nesciunt officiis perspiciatis ut fuga molestias voluptatibus quae amet
							sed non odio cupiditate obcaecati, sapiente porro dolores dolorum. Eveniet quia recusandae dicta.
						</p>
					</section>
					<section id="github">
						<h2>GitHub</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, magnam ab illum dolore ullam nostrum
							aliquam totam maxime esse autem cupiditate optio exercitationem asperiores neque suscipit repudiandae voluptatem
							omnis nihil.
							<br />
							<br />
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit hic, iusto tempora quibusdam reprehenderit ipsa
							quas tempore repellendus nisi officiis molestiae ea odio, explicabo obcaecati libero saepe voluptas harum at
							velit voluptatem aut, nesciunt nulla! Officiis sequi sunt eligendi unde delectus ex doloribus repudiandae culpa
							dolor quas provident maiores reiciendis consequuntur asperiores qui repellat perspiciatis, minima quis. Eveniet
							sint eos exercitationem repudiandae facilis sit tenetur sequi quis ipsa amet quae a quasi, cumque reiciendis
							assumenda quisquam inventore sunt doloribus error. Earum illo inventore architecto, molestiae sunt autem dolorem
							eveniet fugiat nostrum, quis praesentium natus. Pariatur assumenda nihil repudiandae maiores eaque iure? Quae
							magni suscipit, eos impedit deleniti non, voluptatibus ducimus rerum ea aspernatur consectetur error quaerat.
							Numquam consequatur vel porro, saepe illo ab illum minima rerum sed amet hic perspiciatis minus impedit labore
							quos iure praesentium. Architecto quibusdam fuga in nostrum laudantium delectus nesciunt impedit quas, nulla
							animi harum, deserunt aliquam possimus ullam eveniet praesentium aperiam odio incidunt fugiat temporibus, quod
							dolor autem consequatur consequuntur? Culpa quae id facere nobis vero at, sed cupiditate nostrum necessitatibus
							veritatis odit esse itaque iusto ipsam neque omnis aliquam repudiandae ex quia ab eligendi sint! Commodi sit
							facilis illum animi accusantium natus quia sequi, neque deserunt quidem nam dolores nemo, quisquam voluptates
							magni! Neque quaerat doloribus at atque sed accusantium, culpa tenetur, doloremque veritatis quas veniam. Dicta
							tempora aliquid nulla autem laudantium, porro, quisquam qui numquam quas earum provident modi rerum pariatur
							ipsum beatae corporis maxime aut dignissimos. Voluptate suscipit blanditiis veniam molestias quas eaque magnam
							earum? Dignissimos voluptates, fuga officia deleniti nesciunt quasi hic? Suscipit voluptatum porro magnam rem,
							perspiciatis iure officia hic dolorem atque delectus, omnis architecto corrupti, veritatis quae consequatur?
							Esse ducimus veniam possimus ipsum dolores at, aliquid numquam repudiandae. Dicta iusto enim perferendis a,
							quibusdam explicabo nisi animi sint porro.
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
