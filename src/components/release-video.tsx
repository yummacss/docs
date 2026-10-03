"use client";

import { Button } from "@base-ui/react";
import {
  Container,
  createPlayer,
  FullscreenButton,
  MuteButton,
  PlayButton,
  Time,
  TimeSlider,
} from "@videojs/react";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { videoFeatures } from "@videojs/react/video";
import Image from "next/image";
import { useState } from "react";
import { FullScreen, Pause, Play, Sound, SoundOff } from "@/icons";

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

const CONTROL =
  "d:f ai:c jc:c w:9 h:9 bg:transparent h:bg:white/15 c:white c:p fv:os:s fv:ow:2 fv:oc:white";

type Props = { id: string; poster: string; title: string };

/** A release video: the post's cover until someone presses play, and again once the pointer leaves. */
export default function ReleaseVideo(props: Props) {
  return (
    <Player>
      <Frame {...props} />
    </Player>
  );
}

function Frame({ id, poster, title }: Props) {
  const player = usePlayer();
  // nothing loads from YouTube until the first press
  const [mounted, setMounted] = useState(false);
  const [covered, setCovered] = useState(true);

  const start = () => {
    setCovered(false);
    if (mounted) player.play();
    else setMounted(true);
  };

  // leaving the player pauses it under the cover; play picks up where it stopped
  const leave = () => {
    if (!mounted || document.fullscreenElement) return;
    player.pause();
    setCovered(true);
  };

  return (
    <Container
      onPointerLeave={leave}
      className="p:r o:h mb:12 b:1 bc:border bg:black ar:16/9 us:none"
    >
      {mounted && (
        <>
          <div className="p:a i:0">
            <YouTubeVideo
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              autoplay
            />
          </div>
          <div className="p:a l:0 r:0 b:0 d:f ai:c g:2 px:2 py:1 bg:black/70 bf-b:md c:white fs:sm">
            <PlayButton
              render={(props, state) => (
                <Button {...props} className={CONTROL}>
                  {state.paused ? (
                    <Play className="w:4 h:4" />
                  ) : (
                    <Pause className="w:4 h:4" />
                  )}
                </Button>
              )}
            />
            <Time.Group className="d:f g:1 ff:m fs:xs">
              <Time.Value type="current" />
              <Time.Separator />
              <Time.Value type="duration" />
            </Time.Group>
            <TimeSlider.Root className="p:r f:1 d:f ai:c h:6 c:p">
              <TimeSlider.Track className="p:a l:0 r:0 h:1 bg:white/25">
                <TimeSlider.Buffer className="p:a t:0 l:0 h:100% w:var(--media-slider-buffer) bg:white/25" />
                <TimeSlider.Fill className="p:a t:0 l:0 h:100% w:var(--media-slider-fill) bg:white" />
              </TimeSlider.Track>
              <TimeSlider.Thumb className="p:a l:var(--media-slider-fill) ml:-1 w:2 h:3 bg:white fv:os:s fv:ow:2 fv:oc:white" />
            </TimeSlider.Root>
            <MuteButton
              render={(props, state) => (
                <Button {...props} className={CONTROL}>
                  {state.muted ? (
                    <SoundOff className="w:4 h:4" />
                  ) : (
                    <Sound className="w:4 h:4" />
                  )}
                </Button>
              )}
            />
            <FullscreenButton
              render={(props) => (
                <Button {...props} className={CONTROL}>
                  <FullScreen className="w:4 h:4" />
                </Button>
              )}
            />
          </div>
        </>
      )}

      <div
        className={`p:a i:0 zi:10 tp:o tdu:200 ttf:eo @prm:tp:none ${covered ? "o:100" : "o:0 pe:none"}`}
      >
        <Image
          src={poster}
          alt=""
          loading="eager"
          unoptimized
          fill
          className="of:c"
        />
        <Button
          onClick={start}
          aria-label={`Play the ${title} release video`}
          className="p:a t:6 r:6 d:f ai:c g:2 h:10 px:4 bg:white c:indigo-10 fs:sm fw:500 c:p fv:os:s fv:ow:2 fv:oc:white fv:oo:2"
        >
          <Play className="w:4 h:4" />
          Watch the release
        </Button>
      </div>
    </Container>
  );
}
