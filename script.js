const videos = [
	'AQMaaQSrjx1vwMI8r2SWmO8nsg4uzV1iQ7dnTLf0vu1mttza4A87L716qmkZQvwu3SnzVAZwd5xluxg9u5fryT-IcdlutQ4-PgCswfNsPw.mp4',
	'snaptik_7490598657918586142_v3.webm',
	'snaptik_7606501125851860246_v3.mp4',
	'snaptik_7661196277400784148_v3.mp4',
	'snaptik_7676554829925272852_v3.mp4',
	'snaptik_7679094534696865042_v3.mp4',
	'snaptik_7689328084733988116_v3.mp4',
	'snaptik_7690251077484055828_v3.mp4',
	'snaptik_7690620578960624917_v3.mp4',
	'snaptik_7690760909169462559_v3.mp4',
	'snaptik_7691045797957356801_v3_keyed.webp',
	
];

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('gallery');
	container.style.setProperty('--count', videos.length);

	const sound = document.getElementById('gallery-sound');
	const playSound = () => {
		sound.play().catch(error => {
			if (error.name === 'NotAllowedError') {
				const resumeSound = () => {
					document.removeEventListener('pointerdown', resumeSound);
					document.removeEventListener('keydown', resumeSound);
					playSound();
				};
				document.addEventListener('pointerdown', resumeSound, { once: true });
				document.addEventListener('keydown', resumeSound, { once: true });
				return;
			}

			console.error('Unable to play Download-audio.mp3.', error);
		});
	};
	playSound();

	const maxSide = window.innerWidth * 0.5 / 16;

	videos.forEach((file, index) => {
		const isImage = file.endsWith('.webp');
		const media = document.createElement(isImage ? 'img' : 'video');
		media.className = 'gallery-item';
		media.src = 'img/' + file;
		if (isImage) {
			media.alt = '';
			media.decoding = 'async';
		}
		media.style.setProperty('--i', index + 1);
		media.style.setProperty('--left', -Math.random() * maxSide + 'rem');
		media.style.setProperty('--right', -Math.random() * maxSide + 'rem');

		if (!isImage) {
			media.autoplay = true;
			media.muted = true;
			media.loop = true;
			media.playsInline = true;
		}

		container.appendChild(media);

		if (!isImage) {
			media.addEventListener('canplay', () => media.play().catch(() => {}), { once: true });
			media.play().catch(() => {});
		}
	});
});