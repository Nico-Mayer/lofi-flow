// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type VideoData = {
		video_id: string;
		author: string;
		title: string;
		isPlayable: boolean;
		errorCode: null | number;
		backgroundable: boolean;
		cpn: string;
		isLive: boolean;
		isWindowedLive: boolean;
		isManifestless: boolean;
		allowLiveDvr: boolean;
		isListed: boolean;
		isMultiChannelAudio: boolean;
		hasProgressBarBoundaries: boolean;
		isPremiere: boolean;
		progressBarStartPositionUtcTimeMillis: null | number;
		progressBarEndPositionUtcTimeMillis: null | number;
		paidContentOverlayDurationMs: number;
	};

	declare namespace YT {
		// Zustand des Players
		export enum PlayerState {
			UNSTARTED = -1,
			ENDED = 0,
			PLAYING = 1,
			PAUSED = 2,
			BUFFERING = 3,
			CUED = 5
		}

		// Optionen für den Player
		export interface PlayerOptions {
			height?: string;
			width?: string;
			videoId?: string;
			playerVars?: PlayerVars;
			events?: Events;
		}

		// Zusätzliche Parameter
		export interface PlayerVars {
			autoplay?: 0 | 1;
			controls?: 0 | 1;
			loop?: 0 | 1;
			playlist?: string;
			rel?: 0 | 1;
			showinfo?: 0 | 1;
			mute?: 0 | 1;
			start?: number;
			end?: number;
			origin?: string;
			playsinline?: 0 | 1;
			modestbranding?: 0 | 1;
			fs?: 0 | 1; // Fullscreen-Button anzeigen oder ausblenden
		}

		// Ereignis-Callbacks für den Player
		export interface Events {
			onReady?: (event: PlayerEvent) => void;
			onStateChange?: (event: PlayerStateChangeEvent) => void;
			onPlaybackQualityChange?: (event: PlaybackQualityChangeEvent) => void;
			onPlaybackRateChange?: (event: PlaybackRateChangeEvent) => void;
			onError?: (event: PlayerErrorEvent) => void;
			onApiChange?: (event: PlayerEvent) => void;
		}

		// Basis-Event für den Player
		export interface PlayerEvent {
			target: Player;
		}

		// Spezifische Events
		export interface PlayerStateChangeEvent extends PlayerEvent {
			data: PlayerState;
		}

		export interface PlaybackQualityChangeEvent extends PlayerEvent {
			data: string; // z.B. "small", "medium", "large", "hd720", "hd1080"
		}

		export interface PlaybackRateChangeEvent extends PlayerEvent {
			data: number; // Die Wiedergabegeschwindigkeit, z.B. 0.25, 0.5, 1, 1.5, 2
		}

		export interface PlayerErrorEvent extends PlayerEvent {
			data: number; // Fehlercode (2, 100, 101, 150)
		}

		// Das Player-Objekt mit seinen Methoden
		export class Player {
			constructor(elementId: string | HTMLElement, options: PlayerOptions);
			// Steuerung des Players
			playVideo(): void;
			pauseVideo(): void;
			stopVideo(): void;
			seekTo(seconds: number, allowSeekAhead: boolean): void;
			mute(): void;
			unMute(): void;
			isMuted(): boolean;
			setVolume(volume: number): void;
			getVolume(): number;
			setPlaybackRate(rate: number): void;
			getPlaybackRate(): number;
			getAvailablePlaybackRates(): number[];
			setLoop(loopPlaylists: boolean): void;
			setShuffle(shufflePlaylist: boolean): void;
			getVideoLoadedFraction(): number;
			loadVideoById(id: string);

			// Video-Informationen
			getVideoUrl(): string;
			getVideoEmbedCode(): string;
			getDuration(): number;
			getCurrentTime(): number;
			getPlaybackQuality(): string;
			setPlaybackQuality(suggestedQuality: string): void;
			getAvailableQualityLevels(): string[];
			getVideoData(): VideoData;

			// Spielerzustand und ID
			getPlayerState(): PlayerState;
			getIframe(): HTMLIFrameElement;
			getPlaylist(): string[];
			getPlaylistIndex(): number;

			// Player zerstören
			destroy(): void;
		}
	}

	interface Radio {
		kind: string;
		etag: string;
		id: {
			kind: string;
			videoId: string;
		};
		snippet: {
			publishedAt: string;
			channelId: string;
			title: string;
			description: string;
			thumbnails: {
				default: {
					url: string;
					width: number;
					height: number;
				};
				medium: {
					url: string;
					width: number;
					height: number;
				};
				high: {
					url: string;
					width: number;
					height: number;
				};
			};
			channelTitle: string;
			liveBroadcastContent: string;
			publishTime: string;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
