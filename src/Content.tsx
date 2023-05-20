import './content.css';

function Content() {
	return (
		<main>
			<div id="left">
				<div id="leftContent">
					<div className='header'>
						<h5>mirusz9.com</h5>
					</div>
					<a href="#about-me">About Me</a>
					<a href="#projects">Projects</a>
					<a href="#github">Github</a>
					<a href="#contact">Contact</a>
				</div>
			</div>
			<div id="right">
				<div id="rightContent">
					<div className='header'>
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
					<section id="contact">
						<h2>Contact</h2>
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
