import './content.css';

function Content() {
	return (
		<main>
			<div id="left">
				<div id="leftContent">
					<a href="#about-me">About Me</a>
					<a href="#projects">Projects</a>
					<a href="#github">Github</a>
				</div>
			</div>
			<div id="right">
				<div id="rightContent">
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
						</p>
					</section>
					<section id="github">
						<h2>GitHub</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, magnam ab illum dolore ullam nostrum
							aliquam totam maxime esse autem cupiditate optio exercitationem asperiores neque suscipit repudiandae voluptatem
							omnis nihil.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}

export default Content;
