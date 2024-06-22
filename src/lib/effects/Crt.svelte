<div class="crt"></div>
<div class="refresh"></div>

<style>
	@keyframes refresh {
		0% {
			bottom: 100%;
		}
		70% {
			bottom: 100%;
		}
		100% {
			bottom: 0px;
		}
	}
	.refresh {
		pointer-events: none;
		float: left;
		width: 200%;
		height: 100px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0, #99ff9950 10%, rgba(0, 0, 0, 0.1) 100%);
		opacity: 0.1;
		position: fixed;
		bottom: 0;
		z-index: 10;
		animation: refresh 6s linear infinite;
		animation-name: refresh;
		animation-duration: 6s;
		animation-timing-function: linear;
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-direction: normal;
		animation-fill-mode: none;
		animation-play-state: running;
	}

	@keyframes flicker {
		0% {
			opacity: 0.27861;
		}
		5% {
			opacity: 0.34769;
		}
		10% {
			opacity: 0.23604;
		}
		15% {
			opacity: 0.90626;
		}
		20% {
			opacity: 0.18128;
		}
		25% {
			opacity: 0.83891;
		}
		30% {
			opacity: 0.65583;
		}
		35% {
			opacity: 0.67807;
		}
		40% {
			opacity: 0.26559;
		}
		45% {
			opacity: 0.84693;
		}
		50% {
			opacity: 0.96019;
		}
		55% {
			opacity: 0.08594;
		}
		60% {
			opacity: 0.20313;
		}
		65% {
			opacity: 0.71988;
		}
		70% {
			opacity: 0.53455;
		}
		75% {
			opacity: 0.37288;
		}
		80% {
			opacity: 0.71428;
		}
		85% {
			opacity: 0.70419;
		}
		90% {
			opacity: 0.7003;
		}
		95% {
			opacity: 0.36108;
		}
		100% {
			opacity: 0.24387;
		}
	}

	.crt::after {
		content: ' ';
		display: block;
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(18, 16, 16, 0.1);
		opacity: 0;
		pointer-events: none;
		animation: flicker 0.2s infinite;
	}
	.crt::before {
		content: ' ';
		display: block;
		z-index: 10;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
			linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
		background-size:
			100% 3px,
			4px 100%;
		pointer-events: none;
		animation: moveDown 150s linear infinite;
	}

	@keyframes moveDown {
		100% {
			background-position-y: 100%;
		}
	}
</style>
