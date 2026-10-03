"use client";

import { Button } from "@base-ui/react";
import { Slider } from "@base-ui/react/slider";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, Pause, Play, Sound, SoundOff } from "@/icons";

// the slice of the YouTube IFrame Player API this component calls
interface Player {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

interface YouTube {
  Player: new (
    element: HTMLElement,
    options: {
      host: string;
      videoId: string;
      width: string;
      height: string;
      playerVars: Record<string, number>;
      events: {
        onReady: () => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => Player;
}

declare global {
  interface Window {
    YT?: YouTube;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let api: Promise<YouTube> | null = null;

// the API script is fetched once, and only after someone presses play
function loadApi(): Promise<YouTube> {
  api ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT as YouTube);
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.append(script);
  });
  return api;
}

const clock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const CONTROL =
  "d:f ai:c jc:c w:9 h:9 br:9999 bw:1 bc:white/30 bg:transparent c:white c:p fv:os:s fv:ow:2 fv:oc:white";

/** A release video: the post's cover until someone presses play, then the video under the site's own controls. */
export default function ReleaseVideo({
  id,
  poster,
  title,
}: {
  id: string;
  poster: string;
  title: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const start = useCallback(async () => {
    setState("loading");
    const YT = await loadApi();
    if (!mount.current) return;
    player.current = new YT.Player(mount.current, {
      host: "https://www.youtube-nocookie.com",
      videoId: id,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          setDuration(player.current?.getDuration() ?? 0);
          setState("ready");
          player.current?.playVideo();
        },
        // 1 is playing; everything else reads as paused
        onStateChange: (event) => setPlaying(event.data === 1),
      },
    });
  }, [id]);

  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(() => {
      setTime(player.current?.getCurrentTime() ?? 0);
    }, 250);
    return () => clearInterval(tick);
  }, [playing]);

  useEffect(() => () => player.current?.destroy(), []);

  const toggle = () =>
    playing ? player.current?.pauseVideo() : player.current?.playVideo();

  const toggleSound = () => {
    if (muted) player.current?.unMute();
    else player.current?.mute();
    setMuted(!muted);
  };

  const fullScreen = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : frame.current?.requestFullscreen();

  return (
    <div
      ref={frame}
      className="p:r o:h mb:12 b:1 bc:border bg:black ar:16/9 us:none"
    >
      <div ref={mount} className="p:a i:0 w:100% h:100%" />

      {state !== "ready" && (
        <div className="p:a i:0">
          <Image
            src={poster}
            alt=""
            loading="eager"
            unoptimized
            fill
            className="of:c"
          />
          <div className="p:a t:6 r:6 d:f ai:c g:3">
            <Button
              onClick={start}
              disabled={state === "loading"}
              aria-label={`Play the ${title} release video`}
              className="d:f ai:c jc:c w:14 h:14 br:9999 bw:1 bc:white/40 bg:white/15 bf-b:md c:white c:p fv:os:s fv:ow:2 fv:oc:white"
            >
              <Play className="w:6 h:6" />
            </Button>
            <span className="px:3 py:1 br:9999 bg:black/50 bf-b:md c:white fs:sm">
              {state === "loading" ? "Loading the video" : "Watch the release"}
            </span>
          </div>
        </div>
      )}

      {state === "ready" && (
        <div className="p:a l:3 r:3 b:3 d:f ai:c g:3 px:3 py:2 br:lg bg:black/60 bf-b:md c:white fs:sm">
          <Button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className={CONTROL}
          >
            {playing ? (
              <Pause className="w:4 h:4" />
            ) : (
              <Play className="w:4 h:4" />
            )}
          </Button>
          <span className="ff:m fs:xs">
            {clock(time)} / {clock(duration)}
          </span>
          <Slider.Root
            className="f:1"
            value={time}
            min={0}
            max={duration || 1}
            step={1}
            onValueChange={(value) => {
              const seconds = Array.isArray(value) ? value[0] : value;
              setTime(seconds);
              player.current?.seekTo(seconds, true);
            }}
            aria-label="Seek"
          >
            <Slider.Control className="d:f ai:c h:6 c:p">
              <Slider.Track className="p:r w:100% h:1 br:9999 bg:white/25">
                <Slider.Indicator className="h:100% br:9999 bg:white" />
                <Slider.Thumb className="w:3 h:3 br:9999 bg:white fv:os:s fv:ow:2 fv:oc:white" />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <Button
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Mute"}
            className={CONTROL}
          >
            {muted ? (
              <SoundOff className="w:4 h:4" />
            ) : (
              <Sound className="w:4 h:4" />
            )}
          </Button>
          <Button
            onClick={fullScreen}
            aria-label="Full screen"
            className={CONTROL}
          >
            <FullScreen className="w:4 h:4" />
          </Button>
        </div>
      )}
    </div>
  );
}
