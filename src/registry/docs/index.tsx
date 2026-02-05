import type { ComponentType } from "react";
import BackgroundAttachmentFixed from "./background-attachment-fixed";
import BackgroundAttachmentLocal from "./background-attachment-local";
import BackgroundAttachmentScroll from "./background-attachment-scroll";
import BackgroundClipBorder from "./background-clip-border";
import BackgroundClipContent from "./background-clip-content";
import BackgroundClipPadding from "./background-clip-padding";
import BackgroundClipText from "./background-clip-text";
import BackgroundOriginBorder from "./background-origin-border";
import BackgroundOriginContent from "./background-origin-content";
import BackgroundOriginPadding from "./background-origin-padding";
import BackgroundPositionBasic from "./background-position-basic";
import BackgroundRepeatNoRepeat from "./background-repeat-no-repeat";
import BackgroundRepeatRepeat from "./background-repeat-repeat";
import BackgroundRepeatRepeatX from "./background-repeat-repeat-x";
import BackgroundRepeatRepeatY from "./background-repeat-repeat-y";
import BackgroundRepeatRound from "./background-repeat-round";
import BackgroundRepeatSpace from "./background-repeat-space";
import BackgroundSizeAuto from "./background-size-auto";
import BackgroundSizeContain from "./background-size-contain";
import BackgroundSizeCover from "./background-size-cover";

export const docs: Record<string, ComponentType> = {
  "background-attachment-scroll": BackgroundAttachmentScroll,
  "background-attachment-fixed": BackgroundAttachmentFixed,
  "background-attachment-local": BackgroundAttachmentLocal,
  "background-clip-border": BackgroundClipBorder,
  "background-clip-content": BackgroundClipContent,
  "background-clip-padding": BackgroundClipPadding,
  "background-clip-text": BackgroundClipText,
  "background-origin-border": BackgroundOriginBorder,
  "background-origin-content": BackgroundOriginContent,
  "background-origin-padding": BackgroundOriginPadding,
  "background-position-basic": BackgroundPositionBasic,
  "background-repeat-repeat": BackgroundRepeatRepeat,
  "background-repeat-no-repeat": BackgroundRepeatNoRepeat,
  "background-repeat-round": BackgroundRepeatRound,
  "background-repeat-repeat-x": BackgroundRepeatRepeatX,
  "background-repeat-repeat-y": BackgroundRepeatRepeatY,
  "background-repeat-space": BackgroundRepeatSpace,
  "background-size-auto": BackgroundSizeAuto,
  "background-size-cover": BackgroundSizeCover,
  "background-size-contain": BackgroundSizeContain,
};
