<div class="crt"></div>
<div class="refresh"></div>

<style>
	.crt {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(/static/crt.png);
		z-index: 10;
		background-size: 6px auto;
		mix-blend-mode: overlay;
		pointer-events: none;
		opacity: 0.2;
		animation: flicker 150s linear infinite;
	}

	@keyframes flicker {
		100% {
			background-position-y: 100%;
		}
	}

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
	}
</style>
