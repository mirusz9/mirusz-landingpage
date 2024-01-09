import { useEffect, useState } from 'react';
import './footer.css';

export default function Footer() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		const commonMessages = [
			'Probably coding',
			'<3',
			'Hi, I am the footer.',
			'9 * 5',
			'45',
			'11:11',
			'I hope you enjoyed my website',
			'Changing the color of this website is cool',
			'Try my projects pls',
			'Also try minecraft',
			'Also try terraria',
			'Also try portal',
			'Also try undertale',
			'Also try geometry dash',
			'Who is mirusz9 anyway',
			'SMH',
			'I like cake',
			'Yes',
			"I'm a programmer",
			'I appreciate you',
			'Horror movies are not scary',
			'Trust me bro',
			'Source? I made it up',
			`${new Date().getTime()}`,
			"It's a beautiful day outside. birds are singing, flowers are blooming... on days like these, kids like you...",
			"Don't do IB",
			'1v1 me in chess',
			"Yoo, it's ASH!",
			'Use a different password everywhere',
			'Én amicko',
			'5p',
			'Átlagos kedd',
			'TU Delft is cool',
			"What's with all the lizard people?",
			"2.2 is out",
			'check steam',
			"23:56",
			"Rizzmannak nem működik a biciklije ... már megint.",
			"Ho-hó",
			"Eldőlsz elkapsz",
		];

		const rareMessages = [
			'Dark. Darker. Yet darker.',
			'To solve my senior quote, just...',
			'Take a look at my gihub',
			'MUPCWSIMMAFOIAROHE',
			'Name five Jennifer Lawrence movies',
			'How are some people so dumb??',
			'395248',
			'The cake is a lie',
			'Please make me some marshmallows',
			'Escape the matrix',
			` - mirusz9.com ${new Date().getFullYear()}`,
		];

		const commonToRareMessageRatio = 4;
		const rareMessageChance = rareMessages.length / (commonMessages.length * commonToRareMessageRatio + rareMessages.length);
		const newMessage =
			Math.random() < rareMessageChance
				? rareMessages[Math.floor(Math.random() * rareMessages.length)]
				: commonMessages[Math.floor(Math.random() * commonMessages.length)];
		setMessage(newMessage);
	}, []);

	return (
		<footer>
			{message} - mirusz9.com {new Date().getFullYear()}
		</footer>
	);
}
