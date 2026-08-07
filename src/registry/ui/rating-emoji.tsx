import {
  EmojiQuite,
  EmojiSad,
  EmojiSatisfied,
  EmojiTalkingHappy,
} from "iconoir-react";
import Rating, { type RatingIcon } from "./rating";

export default function RatingEmoji() {
  return (
    <Rating
      label="Sprint satisfaction"
      icons={emojis}
      emptyHint="Tap to rate"
    />
  );
}

const emojis: RatingIcon[] = [
  {
    icon: <EmojiSad className="w-7 h-7" />,
    label: "Unsatisfied",
    activeClassName: "c-red",
  },
  {
    icon: <EmojiQuite className="w-7 h-7" />,
    label: "Neutral",
    activeClassName: "c-yellow-5",
  },
  {
    icon: <EmojiSatisfied className="w-7 h-7" />,
    label: "Satisfied",
    activeClassName: "c-green-5",
  },
  {
    icon: <EmojiTalkingHappy className="w-7 h-7" />,
    label: "Delighted",
    activeClassName: "c-green-5",
  },
];
