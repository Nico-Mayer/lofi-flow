<script lang="ts">
	import { buffering, playing } from '$lib/stores/store'
</script>

<div class="vignette" />
<div class="crt" />
<div class="darken" class:paused={$playing === false || $buffering}></div>

<style>
	.paused {
		background-color: rgba(0, 0, 0, 0.3) !important;
	}

	.vignette {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 40;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.4) 100%
		);
	}

	.darken {
		transition: background 0.5s ease-in-out;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 0;
		background-color: rgba(0, 0, 0, 0.1);
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
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(18, 16, 16, 0.1);
		opacity: 0;
		z-index: 2;
		pointer-events: none;
		animation: flicker 0.2s infinite;
	}
	.crt::before {
		content: ' ';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(
				rgba(18, 16, 16, 0) 50%,
				rgba(0, 0, 0, 0.25) 50%
			),
			linear-gradient(
				90deg,
				rgba(255, 0, 0, 0.06),
				rgba(0, 255, 0, 0.02),
				rgba(0, 0, 255, 0.06)
			);
		z-index: 2;
		background-size:
			100% 2px,
			3px 100%;
		pointer-events: none;
	}
</style>
