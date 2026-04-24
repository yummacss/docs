"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Toggle } from "@base-ui/react/toggle";
import { Collapsible } from "@base-ui/react/collapsible";
import { Bookmark, BookmarkFill, ChevronRight } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function CollapsibleDefaultOpen() {
  const [open, setOpen] = useState(true);
  const [saved, setSaved] = useState(
    playlists.saved.reduce(
      (acc, playlist, index) => ({ ...acc, [playlist.id]: index === 0 }),
      {} as Record<string, boolean>,
    ),
  );

  return (
    <Collapsible.Root
      defaultOpen
      className="d-f fd-c w-72 c-slate-10 br-xl"
    >
      <Collapsible.Trigger
        className="d-f b-0 ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fs-sm fw-500 c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        onClick={() => setOpen(!open)}
      >
        <span className="c-slate-9 fs-sm fw-500">{playlists.title}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <ChevronRight className="w-3 h-3" />
        </motion.span>
      </Collapsible.Trigger>

      <Collapsible.Panel
        keepMounted
        render={(props) => (
          <motion.div
            {...(props as HTMLMotionProps<"div">)}
            initial={false}
            animate={
              open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="d-b o-h"
          />
        )}
      >
        <div className="d-f fd-c g-3 mt-1 py-3 px-3 bg-white bc-silver-2 br-xl bw-1">
          {playlists.saved.map((playlist) => (
            <div key={playlist.id} className="d-f ai-c jc-sb">
              <div className="d-f ai-c g-3">
                <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-pill bw-1 va-m us-none">
                  <Avatar.Image
                    src={playlist.cover}
                    alt={playlist.name}
                    className="of-c w-full h-full"
                  />
                  <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
                    {playlist.name[0]}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="d-f fd-c g-0">
                  <span className="c-slate-10 fs-sm fw-500">{playlist.name}</span>
                  <span className="c-slate-6 fs-xs">{playlist.tracks} tracks</span>
                </div>
              </div>
              <Toggle
                pressed={saved[playlist.id]}
                className={`d-f ai-c jc-c w-8 h-8 p-0 br-pill tp-c tdu-150 ttf-io us-none ${
                  saved[playlist.id]
                    ? "bg-sky fv:bg-sky-8 h:bg-sky-8 c-white"
                    : "bg-white bc-sky c-sky bw-1"
                }`}
                aria-label={`Save ${playlist.name}`}
                onClick={() =>
                  setSaved((prev) => ({ ...prev, [playlist.id]: !prev[playlist.id] }))
                }
              >
                {saved[playlist.id] ? (
                  <BookmarkFill className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Toggle>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const playlists = {
  title: "Your Playlists",
  saved: [
    {
      id: "chill-vibes",
      name: "Chill Vibes",
      tracks: 24,
      cover:
        "https://api.dicebear.com/9.x/shapes/svg?seed=chillvibes&backgroundColor=DAF0B9",
    },
    {
      id: "workout-mix",
      name: "Workout Mix",
      tracks: 18,
      cover:
        "https://api.dicebear.com/9.x/shapes/svg?seed=workoutmix&backgroundColor=B4E9F2",
    },
    {
      id: "late-night",
      name: "Late Night",
      tracks: 32,
      cover:
        "https://api.dicebear.com/9.x/shapes/svg?seed=latenight&backgroundColor=D0D1FB",
    },
  ],
};